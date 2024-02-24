import React from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';


function pressed(){
    console.log('pressed')
}


const VocabItem = ({name, Values}) => {
    const itemTitle = name
    const itemValues = Values
    return(
        <View style={styles.container} onPress={pressed}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{itemTitle}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text>{itemValues[0]}</Text>
                <Text>{itemValues[1]}</Text>
            </View>
            
        </View>
    )
}
export default VocabItem

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