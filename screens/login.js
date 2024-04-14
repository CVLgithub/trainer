import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, TextInput } from 'react-native';
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


const LoginWindow = ({ navigation, route }) => {
    //const { setCredentials } = route.params;

    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    return(
        <View>
           <TextInput
                style={styles.username}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="username"
            />

            <Text>{username}</Text> 

            <TextInput
                style={styles.username}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />

            <Text>{password}</Text>

            <Button title='Submit' onPress={() => {navigation.navigate("main")}}></Button>
        </View>
        
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
    username: {
        height: 40,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 2
    }
})