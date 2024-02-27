import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import VocabItem from './components/vocabItem'
import * as func from './functions'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height

let ListOfVocabNames
let createComponents

async function setup(){

  console.log("Setup")
  ListOfVocabNames = await func.resolveLogin(["test", "1"])
  console.log('returned value:')
  console.log(ListOfVocabNames)
  createComponents()

}
 

export default function App() {

  setup()
  const [mainViewVisible, setMainViewVisible] = useState(true);
  const [activeView, setActiveView] = useState('MainView')

  const switchView = (name) => {
    setMainViewVisible(!mainViewVisible)
    setActiveView(name)
    console.log(mainViewVisible)
  }

  return (
    <SafeAreaView style={styles.statusbar}>
      <StatusBar style="auto"/> 

      {mainViewVisible && <MainView switchView={switchView} />}
      {!mainViewVisible && <AbfrageView name={activeView} backToMain={() => {switchView('MainView')}}/>}
        
    </SafeAreaView>
    
  );
}

//------------------------------------------
const MainView = ({switchView}) => {
  
  
  const [items, setComponents] = useState([]);

  createComponents = () => {
    const newComponents = ListOfVocabNames.map((item, index) => (
      <VocabItem key={index} name={item} Values={['0','1', '2']} switchView={switchView}/>
    ));
    setComponents(newComponents);
    console.log('set components')
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Vokabeltrainer</Text>
      <ScrollView style={styles.ScrollView}>
        <ScrollView style={styles.selection} horizontal>
            {items}
        </ScrollView> 
        <View style={styles.stats}>
          <Text>2</Text>
        </View>  
      </ScrollView>

    </View>
  );
};



const AbfrageView = ({name, backToMain}) => {
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
      setResult({grammatik: "click ", deutsch: "Show"})
      UpdateQuestion()
    }
    
  }

  return(
    <View style={AbfrageStyles.view}>
      <Button title="Zurück" onPress={backToMain} />
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
            <Button title='richtig' style={AbfrageStyles.rightButton}/>
            <Button title='falsch' style={AbfrageStyles.falseButton}/>
          </View>
          
          <Button title='next' style={AbfrageStyles.nextButton} onPress={next}/>
        </View>

      </View>
    </View>
    
  )
}


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
    flexDirection: 'row'
  },
  rightButton: {
    backgroundColor: 'white',
  },
  falseButton: {
    backgroundColor: 'blue',
  },
  nextButton: {
    flex: 1,
    backgroundColor: 'black',
  },
})


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
