import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';


// <PopUp title = 'test' button1={{text: 'button1text', func: () =>{console.log("button1func")}}} button2={{text: 'button2text', func: () =>{console.log("button2func")}}}></PopUp>
const PopUp = ({title, button1, button2, deleteSelf}) => {

  const [modalVisible, setModalVisible] = useState(true);
  console.log('popUp called')
  function del() {
    if (deleteSelf){deleteSelf()}
  }
  
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          //setModalVisible(!modalVisible);
          del()
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {setModalVisible(!modalVisible); button1['func'](); del() }}>
                    <Text style={styles.textStyle}>{button1.text}</Text>
                </Pressable>
                {button2 ? 
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {setModalVisible(!modalVisible); button2['func'](); del()}}>
                  <Text style={styles.textStyle}>{button2.text}</Text>
              </Pressable>
                    : <View></View>
                }

            </View>
            
          </View>
        </View>
      </Modal>
  );
};

export default PopUp;


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      margin: 5,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
  });