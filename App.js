import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import VocabItem from './components/vocabItem'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height

function onPressFunction(){
  console.log("pressed:")
}
 const ListOfVocabNames = ['englisch', 'latein', 'spanisch', 'franzoesisch']
export default function App() {

  const [components, setComponents] = useState([]);

  const createComponents = () => {
    ListOfVocabNames.push("added item")
    const newComponents = ListOfVocabNames.map((item, index) => (
      <VocabItem key={index} name={item} Values={['0','1', '2']} onPress={onPressFunction} />
    ));
    setComponents(newComponents);
  };

  return (
    <SafeAreaView style={styles.statusbar}>
      <StatusBar style="auto"/> 

        <View style={styles.view}>
          <Text style={styles.title}>Vokabeltrainer</Text>
          <ScrollView style={styles.ScrollView}>
            <Button title="Komponenten erstellen" onPress={createComponents} />
            <ScrollView style={styles.selection} horizontal>
              
                {components}
             
            </ScrollView> 
            <View style={styles.stats}>
              <Text>2</Text>
            </View>  
          </ScrollView>
      
        </View>
        
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  statusbar: {
    height: screenHeight,
    /* backgroundColor: 'green' */
  },
  container: {
    height: screenHeight
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
