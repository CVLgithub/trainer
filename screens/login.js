import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, TextInput } from 'react-native';
import * as func from '../functions.js'
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import PopUp from '../components/PopUp';

const screenHeight = Dimensions.get('window').height; //full height

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)


async function storeHash(input, callback){
  console.log(input, '<------- Input createhash')
  const hash = await func.createHash(input.username, input.password)
  if(hash){
    func.store({username: input.username, hash: hash}, callback)
  }
  console.log("'createHash in Login': NO VALID HASH - nothing stored")
  
}


async function register(input, setPopUp, callback){
  console.log('register pressed')
  const answer = await func.resolveRegister([input.username, input.password])
  console.log(answer)
  if(answer){
    storeHash(input,callback)
    return
  }
  console.log('popup')
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
    async function effektFunktion() {
      const storedData = await func.getDataArr(['username', 'learnedAb']);
      setUser(storedData.username)
      setLearnedAt(storedData.learnedAb)
    }
    effektFunktion();
  }, []);

  
  const progress = useSharedValue(3);
  const min = useSharedValue(1);
  const max = useSharedValue(10);

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Button title='Login' style = {styles.Button} onPress={() => {storeHash({username: username, password: password},callback)}}></Button>
            <Button title='Log out' style = {styles.Button} onPress={() => {func.store({username: undefined, password: undefined, hash: undefined},callback)}}></Button>
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
            <Text>{learnedAt}</Text>
            <Slider   
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              step={9}
            />
          </Row>
        </View>
        

      </View>

        
        
      {popUp}    
    </View>
    </GestureHandlerRootView>
    
    
  )             
}
export default LoginWindow

const styles = StyleSheet.create({
    container: {
      height: screenHeight,
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
      borderWidth: 1,
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
      flex: 1
    }
    
})





