import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


function pressed(name){
    console.log(name)
}


const UploadCard = ({switchView}) => {
    const borderColour = useSharedValue('black');
    const borderWidth = useSharedValue(1)



    const UploadCardNoAnimation = React.forwardRef(() => {

        const animatedBorderStyle = useAnimatedStyle(() => {
            return {
                borderColor: borderColour.value,
                borderWidth: borderWidth.value,
            };
        });

        return(
        <Pressable 
            onPress={() => 
                switchView('upload')
            } 
            onPressIn={() => {
                console.log('press in');
                borderColour.value = withTiming('red', { duration: 200 });
                borderWidth.value = withTiming(2.5, { duration: 200 })
            }}
            onPressOut={() => {
                console.log('press out');
                borderColour.value = withTiming('black', { duration: 150 });
                borderWidth.value = withTiming(1, { duration: 150 })
            }}
        >
            <Animated.View style={[styles.container, animatedBorderStyle]} >
                <Image
                    style={styles.icon}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/8162/8162972.png',
                    }}
                />
            </Animated.View>  
        </Pressable> 
        )
    })
    
    const AnimatedUploadCard = Animated.createAnimatedComponent(UploadCardNoAnimation) 
    return (
        <AnimatedUploadCard/>
    )
}
export default UploadCard

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 150,
        backgroundColor: '#dfdfdf',
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
})