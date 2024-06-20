
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VocabItem from '../components/vocabItem'
import UploadCard from '../components/uploadCard'
import * as func from '../functions'
import PopUp from '../components/PopUp';
import UserIcon from '../components/usericon.js'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full 

let LoginData

async function getData(keyArr) {
  console.log('get data called')
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
        console.log('No data found');
      }
    }
    return res
    
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};

async function LogginDataStored(){
  const data = await getData(['username', 'hash'])
  console.log(data)
  if (!data.username){
    console.log('no username')
    return false
  } else if (!data.hash){
    console.log('no hash')
  }
  if (data.username == "undefined"){
    console.log('no username')
    return false
  } else if (data.hash == "undefined"){
    console.log('no hash')
  }
  console.log('correct')
  LoginData = data
  return true
}

async function setup(createComponents, goToLogin, setPopUp, navigation){
  console.log('setup called ----------')

  if (!await LogginDataStored()){
    console.log("poPup!!!!!");
    
    
    console.log('setpopUp')
    setPopUp(<PopUp title = 'Login' button1={{text: 'Login', func: goToLogin}} button2={{text: 'cancel', func: () =>{console.log("cancel PopUp")}}} deleteSelf={setPopUp}></PopUp>)
    console.log('after pop up ------')
    createComponents([])
    console.log('after create Comps')
    navigation.setOptions({
      headerRight: () => <UserIcon func = {() => navigation.navigate('login')} loginState={false}/>,
    });
    return
  } else {
    navigation.setOptions({
      headerRight: () => <UserIcon func = {() => navigation.navigate('login')} loginState={true}/>,
    });
  }

  console.log("Setup")
  const ListOfVocabNames = await func.resolveLogin(LoginData)
  console.log('returned value :')
  console.log(ListOfVocabNames)

  //List empty or not logged in successfully
  if(!ListOfVocabNames) {
    console.log('?')
    ListOfVocabNames = {'"index"': '"item"'}
  }
  console.log('??')
  console.log("CREATE COMPS")
  createComponents(ListOfVocabNames)
  
}

const MainView = ({ navigation, route}) => { 
  const [popUp, setPopUp] = useState()
  console.log('main view')
  const [items, setComponents] = useState([]);
  let value
  try {
    console.log('value true')
    value = route.params
    console.log('params:',route.params)
  } catch {
    console.log('value undefined')
    value = false
  }

  const switchV = (name) => {
    console.log("------------------------------",name)
    navigation.navigate("abfrage", {name: name})
  }

  const createComponents = (ListOfVocabNames) => {
    console.log("called create")
    console.log('List of Vocab:', ListOfVocabNames)
    const newComponents = () =>{
      let comps = ListOfVocabNames.map((item, index) => (
        <VocabItem key={index} name={item} Values={['0','1', '2']} switchView = {switchV}/>
      ))
      if (comps.length >= 1){
        comps.push(<UploadCard key = {ListOfVocabNames.lenght + 1} switchView = {() => {navigation.navigate('upload')}}></UploadCard>)
      }
      return comps
    } 
    setComponents(newComponents);
    console.log('set components')
  }

  /* console.log('value: ',value)
  if (value){
    //setComponents()
    setup(createComponents)
  } */
  useEffect(() => {
    console.log("---------------------> EFFECT CALLED")
    setup(createComponents, () => navigation.navigate("login"), setPopUp, navigation);
  }, [value]);
  
  return (
    <View style={styles.view}>
      <ScrollView style={styles.ScrollView}>
        <Text style={styles.selectiontitle}>Deine Vokabeln</Text>
        <ScrollView style={styles.selection} horizontal>
            {items}
        </ScrollView>  
      </ScrollView>

    {popUp}
    </View>
  );
};
  
  
export default MainView
  
  
  
const styles = StyleSheet.create({
statusbar: {
    height: screenHeight,
},
title: {
    paddingTop: 15,
    fontSize: 25,
},
view: {
    flex: 1,
    width: screenWidth,
    /* backgroundColor: 'blue', */
    justifyContent: 'center',
    alignItems: 'center'
},
ScrollView: {
    paddingTop: 30,
    width: screenWidth,
    
},
selectiontitle: {
  marginHorizontal: 37,
},
selection: {
    height: 230,
    marginHorizontal: 30,
    marginBottom: 45,
},
stats: {
    backgroundColor: 'yellow',
    marginHorizontal: 30,
},
VocabItem: {
    backgroundColor: 'red',
}

});
  