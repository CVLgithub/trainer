
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VocabItem from '../components/vocabItem'
import * as func from '../functions'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full 

let LoginData

async function getData(keyArr) {
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

async function LoggedIn(){
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

async function setup(createComponents){

  if (!await LoggedIn()){
    createComponents([])
    return
  }

  console.log("Setup")
  const ListOfVocabNames = await func.resolveLogin(LoginData)
  console.log('returned value:')
  console.log(ListOfVocabNames)
  console.log("CREATE COMPS")
  createComponents(ListOfVocabNames)
  
}

const MainView = ({ navigation, route}) => { 
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
      console.log(ListOfVocabNames)
      const newComponents = ListOfVocabNames.map((item, index) => (
        <VocabItem key={index} name={item} Values={['0','1', '2']} switchView = {switchV}/>
      ));
      setComponents(newComponents);
      console.log('set components')
    }

    /* console.log('value: ',value)
    if (value){
      //setComponents()
      setup(createComponents)
    } */
    useEffect(() => {
      setup(createComponents);
  }, [value]);
  
    useEffect(() => {
        setup(createComponents);
    }, []);
    
    return (
      <View style={styles.view}>
        <ScrollView style={styles.ScrollView}>
          <ScrollView style={styles.selection} horizontal>
              {items}
          </ScrollView> 
          <View style={styles.stats}>
            <Text>2</Text>
            <Text>data</Text>
          </View>  
        </ScrollView>
  
      </View>
    );
};
  
  
export default MainView
  
  
  
const styles = StyleSheet.create({
statusbar: {
    height: screenHeight,
    backgroundColor: 'green'
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
selection: {
    backgroundColor: 'white',
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
  