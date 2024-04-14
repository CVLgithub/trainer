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


const AbfrageView = ({ navigation, route }) => {
    const { name } = route.params;
  
    const [question, setQuestion] = useState({ id: -1, latein: 'Waiting for response' });
    const [list, setList] = useState(null);
    const [showResult, setShowResult] = useState(true)
    const [result, setResult] = useState({grammatik: "click ", deutsch: "Show"})
  
    useEffect(() => {
      const fetchData = async () => {
        console.log('req func');
        const response = await func.apirequestGET("vocab/table", false, undefined, `table=${name}&hash=1&user=test`);
        console.log('Response:', response);
        setList(response);
        const initialQuestion = response.find(item => item.id === 0);
        setQuestion(initialQuestion);
      };
  
      fetchData();
    }, [name]);
  
    const UpdateQuestion = () => {
      console.log("update question");
      console.log(list);
      const nextQuestion = list.find(item => item.id === question.id + 1);
      if (nextQuestion) {
        setQuestion(nextQuestion);
      } else {
        console.log('No next question available');
      }
    };
  
    const next = () => {
      setShowResult(!showResult)
      if (showResult){
        setResult({deutsch: question.deutsch, grammatik: question.grammatik})
      } else{
        setResult({grammatik: "CLICK ", deutsch: "NEXT"})
        UpdateQuestion()
      }
      
    }
  
    return(
      <View style={AbfrageStyles.view}>
        <View style={AbfrageStyles.subContainer}>
  
          <View style={AbfrageStyles.topContainer}>
            <View style={AbfrageStyles.QuestionContainer}>
              <Text style={AbfrageStyles.question}>{question.latein}</Text>
            </View>
            <View style={AbfrageStyles.resultContainer}>
              <Text style={AbfrageStyles.resultText}>{result.grammatik}</Text>
              <Text style={AbfrageStyles.resultText}>{result.deutsch}</Text>
            </View>
            
          </View>
  
  
          <View style={AbfrageStyles.ButtonContainer}>
            <View style={AbfrageStyles.topButtonConatiner}>
              <View style={AbfrageStyles.button}>
                <Button title='richtig' style={AbfrageStyles.rightButton}/>
              </View>
              <View style={AbfrageStyles.button}>
                <Button title='falsch' style={AbfrageStyles.falseButton}/>
              </View>
              
            </View>
            <View style={AbfrageStyles.topButtonConatiner}>
              <Button title='next' style={AbfrageStyles.nextButton} onPress={next}/>
            </View>
            
            
          </View>
  
        </View>
      </View>
      
    )
}
  
export default AbfrageView

const AbfrageStyles = StyleSheet.create({
view: {
    backgroundColor: 'yellow',
    flex:1
},
subContainer: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
topContainer: {
    backgroundColor: 'black',
    height: 120,
    width: screenWidth - 20,
    position: 'absolute',
    top: screenHeight / 2 - 250, // 100 Einheiten über der Mitte
},


QuestionContainer: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
},
question: {
    fontSize: 20,
    textAlign: 'center',
},
resultContainer: {
    flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'row',   
    justifyContent: 'center',
    alignItems: 'center',
},
resultText: {
    textAlign: 'center',
    backgroundColor: 'green',
    flex: 1,
    fontSize: 20
},

ButtonContainer: {
    backgroundColor: 'pink',
    height: 120,
    width: screenWidth - 20,
    position: 'absolute',
    top: screenHeight / 2 - 100, // 75 Einheiten über der Mitte
    flexDirection: 'column',
},
topButtonConatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},
button: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 2,
},
rightButton: {
    backgroundColor: 'white',
},
falseButton: {
    backgroundColor: 'white',
},
nextButton: {
    flex: 1,
    backgroundColor: 'black',
},
})