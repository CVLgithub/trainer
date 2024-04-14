import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VocabItem from './components/vocabItem'
import * as func from './functions'
import LoginWindow from './screens/login.js'
import AbfrageView from './screens/abfrage.js'
import MainView from './screens/main.js'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height



let storedData = 'click me'
let count = 0



let ListOfVocabNames

async function setup(createComponents){

  console.log("Setup")
  ListOfVocabNames = await func.resolveLogin(["test", "1"])
  console.log('returned value:')
  console.log(ListOfVocabNames)
  console.log("CREATE COMPS")
  createComponents(ListOfVocabNames)
  
}

async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(key, String(data));
    console.log('Data stored successfully', count);
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Daten gefunden, setzen sie im State
      console.log(`return ${value}`)
      return value
    } else {
      console.log('No data found');
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};
 

export default function App() {

  const callAsyncSetup = () => {
    setup()
  }

  
  const [mainViewVisible, setMainViewVisible] = useState(true);
  const [activeView, setActiveView] = useState('MainView')


  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style={styles.status}/> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName='main'>
          <Stack.Screen name = "main" component = {MainView} initialParams={{setName: setActiveView, setup: setup}}/>
        <Stack.Screen name = "abfrage" component = {AbfrageView} initialParams={{name: activeView}}/>
        </Stack.Navigator>
      </NavigationContainer>
        
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  safearea: {
    height: screenHeight,
    backgroundColor: 'pink'
  },
  status: {
    backgroundColor: "red"
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
