import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';




const screenWidth = Dimensions.get('window').width; //full width

const user = {
    true : ['person.crop.circle.fill', ['white', 'white'], 'palette'],
    false : ['person.crop.circle.badge.exclamationmark.fill', ['red', 'black'], 'palette']
}


const UserIcon = ( {func, loginState}) => {
    console.log('try icon')
    console.log('usericon:', loginState)
    return (
        <Pressable style={styles.iconbutton} onPress={() => func()} pointerEvents="auto">
            <SymbolView name={user[loginState][0]} style={styles.symbol} colors={user[loginState][1]} type={user[loginState][2]}/>
        </Pressable>
    );
};


export default UserIcon;

const iconSize = 40; // Größe des Icons

const styles = StyleSheet.create({
    icon: {
        width: iconSize,
        height: iconSize,
        
    },
    iconbutton: {
        zIndex: 1,
        color: 'black'
    },
    symbol: {
        width: iconSize,
        height: iconSize,
        marginTop: 2,
      },
});