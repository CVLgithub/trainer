import React from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native';


function pressed(name){
    console.log(name)
}


const VocabItem = ({name, Values, switchView}) => {
    const itemTitle = name
    const itemValues = Values
    return(
        <Pressable onPress={() => switchView(name)}>
          <View style={styles.container} >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{itemTitle}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text>{itemValues[0]}</Text>
                <Text>{itemValues[1]}</Text>
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