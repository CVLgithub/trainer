
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
const screenHeight = Dimensions.get('window').height; //full height




const MainView = ({ navigation, route}) => { 
  const [popUp, setPopUp] = useState()
  const [items, setComponents] = useState([]);
  let refresh
  
  try {
    refresh = route.params
    console.log('refresh:',route.params)
  } catch {
    console.log('refresh undefined')
    refresh = false
  }

  const switchView = (name) => {
    console.log("switch to: ",name)
    navigation.navigate("abfrage", {name: name})
  }

  const createComponents = (VocabDic, loggedIn = true) => {
const ListofVocabNames = []
for (i of VocabDic){
    ListOfVocabNames.push(i)
}
    console.log("called create")
    console.log('List of Vocab:', ListOfVocabNames)
    const newComponents = () =>{
      let comps = ListOfVocabNames.map((item, index) => (
        <VocabItem key={index} name={item} Values= {lastlearned: VocabDic[item]['lastLearned'], pctLearned: VocabDic[item]['pctLearned']} switchView = {switchView}/>
      ))
      if (loggedIn){
        comps.push(<UploadCard key = {ListOfVocabNames.lenght + 1} switchView = {() => {navigation.navigate('upload')}}></UploadCard>)
      }
      return comps
    } 
    setComponents(newComponents);
    console.log('set components')
  }

  useEffect(() => {
    console.log("-> REFRESH EFFECT CALLED")
    setup(createComponents, () => navigation.navigate("login"), setPopUp, navigation);
  }, [refresh]);
  
  return (
    <View style={styles.view}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.selectiontitleView}>
          <Text style={styles.selectiontitle}>Deine Vokabeln</Text>
        </View>      
        <ScrollView style={styles.selection} horizontal>
            {items}
        </ScrollView>  
      </ScrollView>

    {popUp}
    </View>
  );
};
export default MainView
  

function resolveOptions(options){
  func.store(options)
}


async function setup(createComponents, goToLogin, setPopUp, navigation){
  console.log('setup called')

  const [LoginDataIsStored, LoginData] = await func.LogginDataStored()
  console.log(LoginDataIsStored, LoginData)

  if (!LoginDataIsStored){ 
    console.log('setpopUp')
    const PopUpTitle = 'login'
    const PopUpButton1 = {text: 'Login', func: goToLogin}
    const PopUpButton2 = {text: 'cancel', func: () =>{console.log("cancel PopUp")}}
    setPopUp(func.CreatePopUp(PopUpTitle, PopUpButton1, PopUpButton2, setPopUp))

    //clear componets
    createComponents([], false)

    //set Usericon to not logged In
    navigation.setOptions({
      headerRight: () => <UserIcon func = {() => navigation.navigate('login')} loginState={false}/>,
    });
    return
    
  } else {
    //set Usericon to logged In
    navigation.setOptions({
      headerRight: () => <UserIcon func = {() => navigation.navigate('login')} loginState={true}/>,
    });
  }

  console.log("Setup")
  const apiResult = (await func.resolveLogin(LoginData))
  console.log('result',apiResult)
  const [ListOfVocabNames,VocabDic, options] = apiResult

  resolveOptions(options)
  createComponents(ListOfVocabNames)
}
  
  
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
selectiontitleView: {
  marginHorizontal: 40,
  width: 135,
  borderBottomWidth: 1.5,
  borderBottomColor: 'black',
},
selectiontitle: {
  flex: 1,
  fontSize: 22,
  textAlign: 'center'
  
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
  