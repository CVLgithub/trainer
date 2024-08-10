import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import * as func from '../functions'
import PopUp from '../components/PopUp';

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height






const AbfrageView = ({ navigation, route }) => {
  const [popUp, setPopUp] = useState()
  const { name } = route.params;

  const [question, setQuestion] = useState({ id: -1, latein: 'Waiting for response' });
  const [list, setList] = useState(null);
  const [showResult, setShowResult] = useState(true)
  const [result, setResult] = useState({grammatik: "CLICK ", deutsch: "SHOW"})


  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen gains focus
      return () => {
        // Code to run when the screen loses focus
        console.log('left screen')
        save()
      };
    }, [])
  )


  function save(){
    console.log('-----------------saved--------------')
    console.log(list)
    func.handleSave(name, list)
  }

  

  useEffect(() => {
    console.log('---------------------effect run---')
    navigation.setOptions({
      headerRight: () => <Button onPress={() => save()} title='save'/>,
    })
    const fetchData = async () => {
      console.log('req func');
      const response = await func.apirequestGET("vocab/table", false, undefined, `table=${name}`);
      console.log('Response:');
      setList(response);
      const initialQuestion = response.find(item => item.id === 0);
      setQuestion(initialQuestion);
    };

    fetchData();
  }, [name]);

  const UpdateQuestion = () => {
    console.log("update question");
    console.log(question);
    const nextQuestion = list.find(item => item.id === question.id + 1);
    if (nextQuestion) {
      setQuestion(nextQuestion);
    } else {
      save()

      const PopUpTitle = 'Finished learning'
      const PopUpButton1 = {text: 'Restart', func:  () =>{setQuestion({ id: -1, latein: 'start' }); setShowResult(false)}}
      const PopUpButton2 = {text: 'Go Back', func: () =>{navigation.navigate("main")}}
      setPopUp(func.CreatePopUp(PopUpTitle, PopUpButton1, PopUpButton2, setPopUp))
      console.log('No next question available');
    }
  };

  const next = () => {
    setShowResult(!showResult)
    if (showResult){
      setResult({deutsch: question.deutsch, grammatik: question.grammatik})
    } else{
      setResult({grammatik: "CLICK ", deutsch: "SHOW"})
      UpdateQuestion()
    }
  }

  const right = () => {
    if (!showResult) {
      console.log("richtig")
      question.learned += 1
      console.log(question.learned)
      next()
    }
  }

  const wrong = () => {
    if (!showResult) {
      question.learned -= 1
      console.log("falsch")
      console.log(question)
      next()
    }    
  }

  try{
    return(
    <View style={AbfrageStyles.view}>
      <Button title='tabelle' style={AbfrageStyles.nextButton} onPress={func => {navigation.navigate('table', {name: name})}}/>
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
              <Button title='richtig' style={AbfrageStyles.rightButton} onPress={right}/>
            </View>
            <View style={AbfrageStyles.button}>
              <Button title='falsch' style={AbfrageStyles.nextButton} onPress={wrong}/>
            </View>
            
          </View>
          <View style={AbfrageStyles.topButtonConatiner}>
            <View style={AbfrageStyles.button}>
              <Button title='Show' style={AbfrageStyles.nextButton} onPress={next}/>
            </View>
          </View>
          
          
        </View>

      {popUp}
      </View>
    </View>
    
  )
  }
  catch {
    return (
    <View>
        <Text>error</Text>
        <Button title='tabelle' style={AbfrageStyles.nextButton} onPress={func => {navigation.navigate('table', {name: name})}}/>
    </View>)
  }
}
  
export default AbfrageView

const AbfrageStyles = StyleSheet.create({
view: {
    flex:1
},
subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
topContainer: {
    borderWidth: 1,
    height: 120,
    width: screenWidth - 20,
    position: 'absolute',
    top: screenHeight / 2 - 250, // 100 Einheiten über der Mitte
},


QuestionContainer: {
    flex: 1,
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
    borderTopWidth: 1.2,
    flexDirection: 'row',   
    justifyContent: 'center',
    alignItems: 'center',
},
resultText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20
},

ButtonContainer: {
    borderWidth: 1,
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
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 3.5,
},
RightFalseButton: {
  flex: 1,
  backgroundColor: 'black',
},
nextButton: {
    flex: 1,
    backgroundColor: 'black',
},
})


//update save