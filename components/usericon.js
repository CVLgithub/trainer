import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, Pressable, Button } from 'react-native';


const screenWidth = Dimensions.get('window').width; //full width

const user = {
    lockedIn: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.b61rHwfyvldBI6kQRI78jgHaHa%26pid%3DApi&f=1&ipt=1d9777ef62e238400fb478fa73fae41906bf6a280f616a232573b517257fd5bf&ipo=images',
    notLoggedIn : 'https://cdn-icons-png.flaticon.com/128/3914/3914263.png'
}
const login = () => {console.log("user-------------------------------------------")}

const UserIcon = ( {func}) => {
    return (
        <Pressable style={styles.iconbutton} onPress={() => func()} pointerEvents="auto">
            <Image
                style={styles.icon}
                source={{
                    uri: user.lockedIn,
                }}
            />  
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
    }
});