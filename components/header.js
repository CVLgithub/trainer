import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, Pressable, Button } from 'react-native';


const screenWidth = Dimensions.get('window').width; //full width


const Header = ({ title }) => {
    return (
        <View style={styles.container}>       
            <Text style={styles.title} >{title}</Text>            
        </View>
    );
};

export default Header;

const iconSize = 60; // Größe des Icons

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center', // Zentriert den Text horizontal
        flex: 1, // Nimmt den verfügbaren Platz zwischen den Containern ein, um den Text in der Mitte zu positionieren
        fontSize: 30,
    },
    
});