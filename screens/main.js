
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VocabItem from '../components/vocabItem'
import * as func from '../functions'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height

const MainView = ({ navigation, route }) => {

    const { setName } = route.params;
    let { setup } = route.params;
    
    const [items, setComponents] = useState([]);
    const switchV = (name) => {
      setName(name)
      console.log("------------------------------",name)
      navigation.navigate("abfrage")
      
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
            <Text  onPress={console.log("store data")}>2</Text>
            <Text  onPress={console.log("get data")}>data</Text>
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
  