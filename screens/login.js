import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as func from '../functions.js'
import { Slider, Icon } from "@rneui/base";
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';

import PopUp from '../components/PopUp';

const screenHeight = Dimensions.get('window').height; //full height

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)


async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(String(key), String(data));
    console.log('Data stored successfully', key, data);
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

async function getData(key, callback) {
try {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    // Daten gefunden, setzen sie im State
    console.log(`return ${value}`)
    callback(value)
  } else {
    console.log('No data found');
    return 'not logged in'
  }
} catch (error) {
  console.log('Error retrieving data: ', error);
  return 'error'
}
};


async function createHash(input, callback){
  console.log(input, '<------- Input createhash')
  const hash = await func.createHash(input.username, input.password)
  if(hash){
    store({username: input.username, hash: hash}, callback)
  }
  console.log("'createHash in Login': NO VALID HASH - nothing stored")
  
}



function store(input, callback){
  for (i in input){
    storeData(i, input[i])
  }
  callback()
}

async function register(input, setPopUp, callback){
  console.log('register pressed')
  const answer = await func.resolveRegister([input.username, input.password])
  console.log(answer)
  if(answer){
    createHash(input,callback)
    return
  }
  setPopUp(<PopUp title = 'register Failed' button1={{text: 'cancel', func: () =>{console.log("cancel PopUp")}}} button2={undefined} deleteSelf={setPopUp}></PopUp>)
  /* console.log("'createHash in Login': NO VALID HASH - nothing stored") */
}


const LoginWindow = ({ navigation, route }) => {
  //const { setCredentials } = route.params;
  const [popUp, setPopUp] = useState()
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [user, setUser] = useState('test')
  const callback = () => {console.log('callbackrun'), navigation.navigate("main", Math.random())}
  const [learnedAt, setLearnedAt] = useState()

  useEffect(() => {
    getData('username', setUser);
  }, []);


  return(
    <View style = {styles.container}>
      <View style = {styles.login}>

        {user != 'undefined' && <Text style = {styles.text}> logged in as: '{user}'</Text>}

        <View style = {styles.inputContainer}>
          <TextInput
              style={styles.TextInput}
              onChangeText={onChangeUsername}
              value={username}
              placeholder="username"
          />
          <TextInput
              style={styles.TextInput}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Password"
          />
        </View>

          <View style  = {styles.buttonContainer}>
            <Button title='Login' style = {styles.Button} onPress={() => {createHash({username: username, password: password},callback)}}></Button>
            <Button title='Log out' style = {styles.Button} onPress={() => {store({username: undefined, password: undefined, hash: undefined},callback)}}></Button>
            <Button title='Register' style = {styles.Button} onPress={() => {register({username: username, password: password},setPopUp,callback)}}></Button>               
          </View>

      </View>
      
        

      <View style = {styles.Grid}>
        
        <View style = {styles.coloumn}>
          <Row>
            <Text>Gelernt ab:</Text>
            
          </Row>
        </View>


        <View style = {styles.coloumn}>
          <Row>
            {/* <Slider
              animationType="timing"
              maximumTrackTintColor="#ccc"
              maximumValue={10}
              minimumTrackTintColor="#222"
              minimumValue={2}
              allowTouchTrack
              onSlidingComplete={(value) =>
                setLearnedAt(value)
              }
              orientation="horizontal"
              step={1}
              style={{flex: 1, margin: 10}}
              thumbStyle={{ height: 15, width: 15}}
              thumbTintColor="#0c0"
              thumbTouchSize={{ width: 8, height: 8 }}
              trackStyle={{ height: 8, borderRadius: 1 }}
              value={50}
            /> */}
          </Row>
        </View>
        

      </View>

      <View style = {styles.Button}>
        <Button title = 'test'/>
      </View>
        
        
      {popUp}    
    </View>
    
  )             
}
export default LoginWindow

const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      backgroundColor: 'green',
    },
    TextInput: {
        paddingLeft: 10,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 2,
        width: 150,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 20
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    Button: {
      flex: 1,
      backgroundColor: 'blue'
    },
    text: {
      textAlign: 'center',
      
    },
    login: {
      //login
    },
    Grid: {
      margin: 10,
      flex: 2,
      backgroundColor: "red",
      flexDirection: 'row',
    },
    SaveButton: {
      backgroundColor: 'black'
    },
    NumberInput: {
      backgroundColor: 'green'
    },
    row: {
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    coloumn: {
      margin: 10,
      backgroundColor: 'white',
      flex: 1
    }
    
})





