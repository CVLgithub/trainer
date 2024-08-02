import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VocabItem from '../components/vocabItem'
import * as func from '../functions'
import PopUp from '../components/PopUp';

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


const Size = {
  coloumn1Width: '29%',
  coloumn2Width: '29%',
  coloumn3Width: '29%',
  coloumn4Width: '13%',
}

const Row = ({ values }) => {
  console.log('Werte:', values)
  return(
    <View style={styles.rowContainer}>
      <Text style = {styles.RowTxt} flexBasis = {Size.coloumn1Width}>{values.latein}</Text>
      <Text style = {styles.RowTxt} flexBasis = {Size.coloumn1Width}>{values.deutsch}</Text>
      <Text style = {styles.RowTxt} flexBasis = {Size.coloumn1Width}>{values.grammatik}</Text>
      <Text style = {styles.RowTxt} flexBasis = {Size.coloumn1Width}>{values.learned}</Text>
    </View>
    
  )
}

const Header = ({ navigation, route }) => {
  return(
    <View style = {styles.headerConatiner}>
      <Text style = {styles.HeaderTxt} flexBasis = {Size.coloumn1Width}>Latein</Text>
      <Text style = {styles.HeaderTxt} flexBasis = {Size.coloumn2Width}>Deutsch</Text>
      <Text style = {styles.HeaderTxt} flexBasis = {Size.coloumn3Width}>Grammatik</Text>
      <Text style = {styles.HeaderTxt} flexBasis = {Size.coloumn4Width}>Gelernt</Text>
    </View>
  )
}




const TableView = ({ navigation, route }) => {

  const { name } = route.params;

  const [list, setList] = useState([['1','1','loading','1',]]);
  const [comps, setComps] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      console.log('req func');
      const response = await func.apirequestGET("vocab/table", false, undefined, `table=${name}`);
      setList(response); 
    };
    
    fetchData();
  }, [name]);

  useEffect(() => {
    setComps(list.map((item, index) => (
      <Row values = {item} key={index}/> 
    )))
  }, [list]);
  
  

  return(
    <View style={styles.view}>
      <Header/>
      <ScrollView>
        {comps}
      </ScrollView>
      
    </View>
    
  )
}
  
export default TableView

const styles = StyleSheet.create({
view: {
    flex:1,
    padding: 4
},
subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
rowContainer: {
  flexDirection: 'row',
},
headerConatiner: {
  flexDirection: 'row',
 
},
HeaderTxt: {
  borderWidth: 2,
  paddingBottom: 4
},
RowTxt: {
  borderWidth: 0.3,
},
})