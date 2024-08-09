import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, TextInput } from 'react-native';
import * as func from '../functions.js'
import Animated, { useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import PopUp from '../components/PopUp';


const screenHeight = Dimensions.get('window').height; //full height
const screenWidth = Dimensions.get('window').width; //full width


const Width = screenWidth - 20

const Row = ({ children }) => (
  <View style={styles.row}>
    <View width={Width/2}>
      {children[0]}
    </View>
    <View flex={1} marginHorizontal={10}>
      {children[1]}
    </View>
  </View>
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

function handleSlider(value, setLearned){
    //setLearnedAt(value)
    func.storeData('learnedAb', value)
    setLearned(value)
    func.setOptions({'learnedAb': value})
}



const LoginWindow = ({ navigation, route }) => {
  //const { setCredentials } = route.params;
  const [popUp, setPopUp] = useState()
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [user, setUser] = useState('test')
  const callback = () => {console.log('callbackrun'), navigation.navigate("main", Math.random())}
  const [learnedAt, setLearnedAt] = useState()
  const [slider, setSlider] = useState(<View></View>)

  const progress = useSharedValue(3)
  const min = useSharedValue(1);
  const max = useSharedValue(10);
  

  const initSlider = () => {
    setSlider(<Slider   
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      step={9}
      style={styles.slider}
      onSlidingComplete={(x) =>{handleSlider(x, setLearnedAt)}}
    />)
  }


  useEffect(() => {
    async function effektFunktion() {
      const storedData = await func.getDataArr(['username', 'learnedAb']);
      setUser(storedData.username)
      setLearnedAt(Number(storedData.learnedAb))
    }
    effektFunktion();
  }, []);

  useEffect(
    () => {
      if (learnedAt > 10 || learnedAt <= 0 || learnedAt == undefined) {console.log('out of bounds'); return}
      progress.value = learnedAt
      setTimeout(() => {
        initSlider()
      }, 1);
    }, [learnedAt]
  )
  

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
        
        <Row>
          <Text>Gelernt ab:</Text>
          <Text>{learnedAt}</Text>
        </Row>

        <Row>
          <Text>Slider:</Text>
          {slider}
        </Row>

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
    },
    SaveButton: {
      backgroundColor: 'black'
    },
    NumberInput: {
      backgroundColor: 'green'
    },
    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: 'space-between',
      maxHeight: 25,
    },
    coloumn: {
      margin: 10,
      flex: 1
    },
    slider: {
      //marginHorizontal: 20,
    }
    
})





/* 

  conf tabelle für neue nutzer erstellen



*/