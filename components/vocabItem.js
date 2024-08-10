import React, { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


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






const VocabItem = ({ name, Values = { lastlearned: '13.01.24', pctLearned: 0.45 }, switchView }) => {
    const borderColour = useSharedValue('black');
    const borderWidth = useSharedValue(1)

    const itemTitle = name;
    const msg = setMsg(Values.pctLearned);

    // Define the animated style for the border color
    const animatedBorderStyle = useAnimatedStyle(() => {
        return {
            borderColor: borderColour.value,
            borderWidth: borderWidth.value,
        };
    });

    return (
        <Pressable
            
            onPress={() => switchView(name)}
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
            <Animated.View style={[animatedBorderStyle,styles.animated]}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{itemTitle}</Text>
                    </View>

                    <View style={styles.subContainer}>
                        <Text>Zuletzt gelernt am: {Values.lastlearned}</Text>
                        <Text>Du kannst schon {Values.pctLearned * 100}%</Text>
                        <Text>{msg}</Text>
                    </View>
                </View>
            </Animated.View>
            
        </Pressable>
    );
};

export default VocabItem

const styles = StyleSheet.create({
    animated: {
        borderRadius: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: 10,
        
    },
    container: {
        height: 200,
        width: 150,
        backgroundColor: '#dfdfdf',
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





