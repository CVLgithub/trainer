
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';



import VocabItem from '../components/vocabItem'
import UploadCard from '../components/uploadCard'
import * as func from '../functions'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full 



const UploadView = ({ navigation, route}) => { 

    return (
        <View style={styles.view}>
            <Button title="Pick something" onPress={func.pickSomething} />
        </View>
    );
};

  
export default UploadView
  
  
  
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
  