import React from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native';


function pressed(name){
    console.log(name)
}

function setMsg(pct){
    if (pct >= 0.5){
        return 'PRIMA!'
    } else {
        return 'Bleib dran ;)'
    }
}


const VocabItem = ({name, Values = {lastlearned: '13.01.24', pctLearned: 0.45}, switchView}) => {
    const itemTitle = name
    const msg = setMsg(Values.pctLearned)
    return(
        <Pressable onPress={() => switchView(name)}>
          <View style={styles.container} >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{itemTitle}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text>Zulezt gelernt am: {Values.lastlearned}</Text>
                <Text>Du kannst schon {Values.pctLearned * 100}%</Text>
                <Text>{msg}</Text>
            </View>
            
            </View>  
        </Pressable>
        
    )
}
export default VocabItem

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 150,
        backgroundColor: '#dfdfdf',
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
        backgroundColor: '#f9f9f9',
        flex: 1,
        marginBottom: 12,
    },
})