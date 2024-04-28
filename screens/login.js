import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as func from '../functions.js'


async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(String(key), String(data));
    console.log('Data stored successfully', key, data);
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

async function getData(key, callback) {
try {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    // Daten gefunden, setzen sie im State
    console.log(`return ${value}`)
    callback(value)
  } else {
    console.log('No data found');
    return 'not logged in'
  }
} catch (error) {
  console.log('Error retrieving data: ', error);
  return 'error'
}
};


async function createHash(input, callback){
  const hash = await func.createHash(input.username, input.password)
  if(hash){
    store({username: input.username, hash: hash}, callback)
  }
  console.log("'createHash in Login': NO VALID HASH - nothing stored")
  
}



function store(input, callback){
  for (i in input){
    storeData(i, input[i])
  }
  callback()
}

const LoginWindow = ({ navigation, route }) => {
    //const { setCredentials } = route.params;

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [user, setUser] = useState('test')
    const callback = () => {console.log('callbackrun'), navigation.navigate("main", Math.random())}


    useEffect(() => {
      getData('username', setUser);
    }, []);


    return(
        <View>
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
              <Button title='Submit' style = {styles.Button} onPress={() => {createHash({username: username, password: password},callback)}}></Button>
              <Button title='Log out' style = {styles.Button} onPress={() => {store({username: undefined, password: undefined, hash: undefined},callback)}}></Button>            
            </View>
            
            
            
            
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
        borderRadius: 100
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
    },
    text: {
      textAlign: 'center',
    }
})