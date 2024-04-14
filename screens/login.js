import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as func from '../functions'



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


const LoginWindow = () => {
    return(
        <Text>Login</Text>
    )
}
export default LoginWindow

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 150,
        backgroundColor: 'green',
        margin: 10,
        borderRadius: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    titleContainer: {
        marginTop: 5,
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
    },
    subContainer: {
        backgroundColor: 'yellow',
        flex: 1,
        marginBottom: 12,
    },
})