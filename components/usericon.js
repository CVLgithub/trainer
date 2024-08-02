import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';




const screenWidth = Dimensions.get('window').width; //full width

const user = {
    true : ['person.fill', ['black', 'black'], 'palette'],
    false : ['person.slash.fill', ['red', 'black'], 'palette']
}


const UserIcon = ( {func, loginState}) => {
    
    const iconSize = 35; // Größe des Icons

    const styles = StyleSheet.create({
        iconbutton: {
            zIndex: 1,
            width: iconSize + 5,
            height: iconSize + 5,
            alignItems: 'center'
        },
        symbol: {
            width: iconSize,
            height: iconSize,
            marginTop: 2,
        },
    });


    return (
        <Pressable style={styles.iconbutton} onPress={() => func()} pointerEvents="auto">
            <SymbolView name={user[loginState][0]} style={styles.symbol} colors={user[loginState][1]} type={user[loginState][2]}/>
        </Pressable>
    );
};


export default UserIcon;

