import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';


import VocabItem from './components/vocabItem'
import * as func from './functions'
import LoginView from './screens/login.js'
import AbfrageView from './screens/abfrage.js'
import MainView from './screens/main.js'
import Header from './components/header.js'
import UserIcon from './components/usericon.js'
import UploadView from './screens/upload.js'
import PopUp from './components/PopUp.js';
import TableView from './screens/ViewTable.js'


const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height



let storedData = 'click me'
let count = 0

//const [LoginData, setLoginData] = useState({username: undefined, password: undefined})
 

//<UserIcon func = {() => navigation.navigate('login')}/>

export default function App() {
  const Stack = createNativeStackNavigator();

  const ToLogin = () => {navigation.navigate("login")}

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={styles.safearea}
      />
      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: "#f2f2f2",
          position: "relative",
        }}
      >
        <StatusBar style={styles.status}/> 
        <NavigationContainer>
          <Stack.Navigator initialRouteName='main'>
            <Stack.Screen name = "main" component = {MainView} options={({ navigation, route}) => ({title: 'Home2', headerTitle: () => <Header title={"Vokabeltrainer"}/>, headerRight: () => <UserIcon func = {ToLogin} loginState={true}/> })}/> 
            <Stack.Screen name = "abfrage" component = {AbfrageView} options={{title: 'Abfrage', headerTitle: (props) => <Header title={props.children}/>, headerRight: () => <Text>save</Text>}}/>
            <Stack.Screen name = "login" component = {LoginView} options={{title: 'Login', headerTitle: (props) => <Header title={props.children}/>}}/>
            <Stack.Screen name = "upload" component = {UploadView} options={({ navigation, route}) => ({title: 'Zurück', headerTitle: () => <Header title={"Upload"}/>, headerRight: () => <UserIcon func = {ToLogin} loginState={true}/> })}/>
            <Stack.Screen name = "table" component = {TableView} options={({ navigation, route}) => ({title: 'Zurück', headerTitle: () => <Header title={"Tabelle"}/>, headerRight: () => <UserIcon func = {ToLogin} loginState={true}/> })}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
    

  );
}




const styles = StyleSheet.create({
  safearea: {
    flex: 0
    //height: screenHeight,
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
