import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { FlatListComponent } from 'react-native';

import PopUp from './components/PopUp';

import axios from 'axios'

export function test(){
    console.log("test from func")
}

const dictionaries = {};
let vocab = {"test": "2"}

const test2 = [{"latein": "1", "deutsch":"2"}, {"latein":"3", "deutsch": "4"}]
let tablenames
let currentTable
let currentTableData
let changeInVocab
let active
let currentUser 


export function CreatePopUp(title, button1, button2, deleteSelf){
  //button example: {text: 'cancel', func: () =>{console.log("cancel PopUp")}}
  return <PopUp title = {title} button1={{text: button1.text, func: button1.func}} button2={{text: button2.text, func: button2.func}} deleteSelf={deleteSelf}></PopUp>
}

export const pickSomething = async () => {
  const storage = await getDataArr(['username', 'hash'])
  try {
    const docRes = await DocumentPicker.getDocumentAsync();

    const formData = new FormData();
    const assets = docRes.assets;
    if (!assets) return;

    const file = assets[0];

    const csvFile = {
      name: file.name.split(".")[0],
      uri: file.uri,
      type: file.mimeType,
      size: file.size,
    };

    formData.append("datei", csvFile);

    console.log(storage.username, storage.hash)
    formData.append('username', storage.username);
    formData.append('hash', storage.hash);

    apiUrl = 'http://api.inka.mywire.org/api/upload'

    const { data } = await axios.post(apiUrl, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('file send');
  } catch (error) {
    console.log("Error while selecting file: ", error);
  }
};



export async function handleSave(tablename, table) {
  const storage = await getDataArr(['username', 'hash'])
  url = `vocab/table/save?user=${storage.username}&hash=${storage.hash}&table=${tablename}`
  apirequestPOST(url, table)
}


async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(String(key), String(data));
    console.log('Data stored successfully', key, data);
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

export function store(input, callback = ()=> {console.log('stored')}){
  for (i in input){
    storeData(i, input[i])
  }
  callback()
}


export async function getDataArr(keyArr) {
  try {
    let res = {}
    for (key in keyArr){
      console.log('trying', keyArr[key])
      const value = await AsyncStorage.getItem(keyArr[key]);
      if (value !== null) {
        // Daten gefunden, setzen sie im State
        console.log(`return ${value}`)
        res[String(keyArr[key])] = value
      } else {
        res[String(keyArr[key])] = undefined
        console.log('No data found');
      }
    }
    return res
    
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};

export async function getData(key, callback) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Daten gefunden, setzen sie im State
      console.log(`return ${value}`)
      callback(value)
    } else {
      console.log('No data found');
      return 'error'
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
    return 'error'
  }
  };

export async function LogginDataStored(){
  return new Promise(async (resolve, reject) => {
    const data = await getDataArr(['username', 'hash'])
    console.log('getDataArr result:', data)
    const username = data.username
    const hash = data.hash
    if (!username || !hash || username == "undefined" || hash == "undefined"){
      console.log('no username or hash')
      resolve([false, undefined])
    }
    console.log('correct')
    
   resolve([true,data])
  })
}





export async function createHash(username, password){
  return new Promise(async (resolve, reject) => {
    console.log("func.createHash called")
    let hash = false
    console.log(username, password) 
    const response = await apirequestPOST("login",[username,password,false], false)
    if(response[0]){
      console.log('set new hash')
      hash = response[2].substring(response[2].indexOf('@') + 1)
    }
    console.log('function "create Hash" returns:', hash)
    resolve(hash)
  })
}


export async function resolveLogin(custom){
  return new Promise(async (resolve, reject) => {
    console.log('req')
    const user = custom.username
    const password = false
    const hash = custom.hash
    console.log(user, password, hash) 
    const apiResult = await apirequestPOST("login",[user,password,hash])
    console.log('res')
    resolve(apiResult)
  })
}

//input format [username, password]
export async function resolveRegister(input) {
  return new Promise(async (resolve, reject) => {
    console.log('Input: ', input)
    const res = await apirequestPOST('register', input, false)
    console.log('RESPONE----------> ', res)
    resolve(res)
  })
}





//makes Api request to /api/${custom}
export async function apirequestGET(url, process = true, callback, req = false) {
  return new Promise(async (resolve, reject) => {
    //resolve('test')
    let reqUrl = `http://api.api.inka.mywire.org/api/${url}` 
    
    if (req){
      if (url == "vocab/table"){
        const storage = await getDataArr(['username', 'hash'])
      reqUrl = reqUrl + "?" + String(req) + `&hash=${storage.hash}&user=${storage.username}`
      } else {
        reqUrl = reqUrl + "?" + String(req)
      }
    }
    console.log(`Get request to url: ${reqUrl}, with content: ${req}`)

    fetch(reqUrl)
      .then(response => {
        if (!response.ok) {
          //console.log(response)
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {

        if(!data){console.log("SERVER DENIED request:" + reqUrl); resolve("server denied is being retuned"); return data}
        console.log(`Request to (${reqUrl}) made successfully with response data: [${data}]`);
        resolve(data)
        console.log('resolved')
        
        if (process) {
          processList(data);
        } else {
          tablenames = data;
          if (callback && typeof callback === 'function') {
            console.log("Callback");
            callback();
          }
        }
      })
      .catch(error => {
        console.error("Error ->", error);
      });
  })
}

//Api Post function
async function apirequestPOST(url, content, autoGetReq = true) {
  return new Promise(async (resolve, reject) => {
    console.log(`Post request to url: ${url}, with content: ${content}`)
    fetch(`http://api.inka.mywire.org/api/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      //Response
      .then(async response =>  {
        if (response.ok) {
          console.log('Post-Abonnement erfolgreich erstellt');
          const responseValue = response.json()


          //Antwort verarbeiten
          if (!autoGetReq) {
            resolve(responseValue)
            return
          }

          if (url == "login"){
            resolve(await processlogin(responseValue, content))
          }

          if (url == "register"){
            resolve(responseValue)
          }
          
        } else {
          console.error('Fehler beim Erstellen des Push-Abonnements:', response.status);
        }
      })
      //Eroor catch
      .catch(error => {
        console.error('Fehler beim Senden der Anfrage:', error);
      });
  })
}

async function processlogin(response, content){
  return new Promise(async (resolve, reject) => {
    console.log("try loggin (ProcessLogin)")
    response.then(async data => {
      const loginSuccess = data[0][0]
      const responseStr = data[1]
      const responseHash = data[2]
      const options = data[0][1]


      if (!loginSuccess){
        console.log("couldn't login")
        resolve(false)
        return
      }
      console.log("logged in succesfully")          
                    

      if (responseHash){   
        if (String(responseHash) == "true,logged in with hash")   {
          console.log("WTF")
        } 
      }
      else{
        console.log("logged in with hash")
      } 

      //console.log("currentuser is set to: " + currentUser)

      console.log('content. for getTables ----------------: ', content)
      const res = await getTables(content)
      resolve([res,options])
    })
  })
}


async function getTables(content){
  return new Promise(async (resolve, reject) => {
    console.log("get tables called")
    resolve(await apirequestGET("vocab/tables", false, undefined, `userName=${content[0]}&password=${content[1]}&hash=${content[2]}`)) 
  })
}


export async function setOptions(dir){
  const storage = await getDataArr(['username', 'hash'])
  console.log(dir)
  url = `vocab/saveOptions?user=${storage.username}&hash=${storage.hash}&options=${JSON.stringify(dir)}`
  apirequestPOST(url)
}






















//takes list of vocabs as dictionarys and handels it
async function processList(list) {
  console.log("processList start");
  const lateinValueElement = document.getElementById('lateinValue');
  const GrammatikValueElement = document.getElementById('Grammatik');
  const DeutschValueElement = document.getElementById('Deutsch');

  list.sort((a, b) => a["learned"] - b["learned"]);
  for (let x in list) {
    const currentDictionary = list[x]

    //show warte
    document.getElementById("right").style.display = 'none';
    document.getElementById("false").style.display = 'none';
    document.getElementById("weiter").style.display = 'block';


    lateinValueElement.textContent = currentDictionary.latein;
    GrammatikValueElement.textContent = "Warte";
    DeutschValueElement.textContent = "Warte";
    
    

    await waitForButtonPressWeiter(); // Lösung anzeigen

    //hide weiter button
    document.getElementById("right").style.display = 'block';
    document.getElementById("false").style.display = 'block';
    document.getElementById("weiter").style.display = 'none';
    console.log("button hide");

    lateinValueElement.textContent = currentDictionary.latein;
    GrammatikValueElement.textContent =  currentDictionary.grammatik;
    DeutschValueElement.textContent = currentDictionary.deutsch;

    const buttonPress = await waitForButtonPressTrueFalse()
    console.log(buttonPress)
    if (buttonPress === "true") {
      currentDictionary["learned"] = currentDictionary["learned"] + 1;
      console.log(currentDictionary)
      
    } 
    else if(buttonPress === "false"){
      currentDictionary["learned"] = currentDictionary["learned"] - 1;
      console.log(currentDictionary)
    } else {
      console.log("next")
    }
    SaveReminder()

    //update table data
    currentTableData = list

    //showScore(currentDictionary.latein, currentDictionary["learned"]);
    console.log("button press");
    // Hier kannst du weitere Aktionen ausführen, nachdem der Knopf gedrückt wurde
  };
  //}
  document.getElementById("right").style.display = 'none';
  document.getElementById("false").style.display = 'none';
  document.getElementById("weiter").style.display = 'block';
  lateinValueElement.textContent = "Zu Ende gelernt"
  handleMainView("finishedlearning")
  /* await waitForButtonPressTrueFalse(); */
  //processList()
}











function save(){
  const notifyDiv = document.getElementById("notifyHeader")
  console.log("saved")
  notifyDiv.innerHTML = "Auto Saved"
  setTimeout(function(){console.log("delete notification"); notifyDiv.innerHTML = ""}, 3000);
}

function setAutoSave(time){
  if (time == 0){
    autoSave = 0
    return
  }
  autoSave = setTimeout(save, time*60000);
}



async function start(){
  const loginSuccess = await checkLogin()
  console.log("startlogin = ", loginSuccess)
  if (loginSuccess){
    console.log("start request ->")
    apirequestGET("vocab/tables", false, chooseVocab, `userName=${currentUser}&hash=${(await getCookie("hash"))[1][1]}`)
  }
  
}
//start()

//auto save
//let autoSave = setInterval(save, 60000);