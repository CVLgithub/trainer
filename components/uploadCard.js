import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, Pressable } from 'react-native';


function pressed(name){
    console.log(name)
}


const UploadCard = ({switchView}) => {
    return(
        <Pressable onPress={() => switchView('upload')}>
            <View style={styles.container} >
                <Image
                    style={styles.icon}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/8162/8162972.png',
                    }}
                />
            </View>  
        </Pressable>
        
    )
}
export default UploadCard

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 150,
        backgroundColor: 'green',
        margin: 10,
        borderRadius: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'center',
        width: 60,
        height: 60,
        marginBottom: 10
    },
    subContainer: {
        backgroundColor: 'yellow',
        flex: 1,
        marginBottom: 12,
    },
})