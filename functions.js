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




export async function resolveLogin(custom){
  return new Promise(async (resolve, reject) => {
    const user = 'test'
    const password = '1'
    const hash = false
    console.log(user, password) 
    resolve(await apirequestPOST("login",[user,password,hash]))
  })
}



//makes Api request to /api/${custom}
export async function apirequestGET(url, process = true, callback, req = false) {
  return new Promise(async (resolve, reject) => {
    //resolve('test')
    let reqUrl = `https://inka.mywire.org/api/${url}` 
    console.log(`Get request to url: ${reqUrl}, with content: ${req}`)
    if (req){
      reqUrl = reqUrl + "?" + String(req)
    }

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
async function apirequestPOST(url, content) {
  return new Promise(async (resolve, reject) => {
    console.log(`Post request to url: ${url}, with content: ${content}`)
    fetch(`https://inka.mywire.org/api/${url}`, {
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

          if (url == "login"){
            resolve(await processlogin(responseValue, content))
          }

          if (url == "register"){
            //resolve(await processRegister(responseValue))
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
    console.log("try loggin")
    response.then(async data => {
      const loginSuccess = data[0]
      const responseStr = data[1]
      const responseHash = data[2]

      if (!loginSuccess){
        console.log("couldn't login")
        resolve()
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

      
      resolve(await getTables())
    })
  })
}

async function checkLogin() {
  return new Promise(async(resolve, reject) => {
    console.log("check cookies")
    //gettting hash from cookies
    const cookieRes = await getCookie("hash")
    console.log(cookieRes)

    //trying Login with cookie
    if (cookieRes[0]) {
      const cookieValues = cookieRes[1]
      await resolveLogin([cookieValues[0].substring(5), cookieValues[1]])
    } 
    resolve(cookieRes[0])
    console.log("console:" + cookieRes[1]) 
  })
}

async function getTables(){
  return new Promise(async (resolve, reject) => {
    console.log("get tables called")
    resolve(await apirequestGET("vocab/tables", false, undefined, `userName=test&password=1`)) 
  })
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








async function resolveRegister(){
  return new Promise(async (resolve, reject) => {
    const form = document.getElementById("loginForm")
    const user = form[0].value
    const password = form[1].value
    console.log(user + password)
    await apirequestPOST("register",[user,password])
    resolve()
  })
}

async function processRegister(response){
  return new Promise(async (resolve, reject) => {
    document.getElementById("loginRes").textContent = response[1]
    resolve()
  })
}




function save(){
  const notifyDiv = document.getElementById("notifyHeader")
  console.log("saved")
  handleSave()
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

async function handleSave(){
  document.getElementById("saveReminder").style.display = "none"
  console.log("request ->")
  const hash = (await getCookie("hash"))[1][1]
  url = `vocab/table/save?user=${currentUser}&hash=${hash}&table=${currentTable}`
  apirequestPOST(url, currentTableData)
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