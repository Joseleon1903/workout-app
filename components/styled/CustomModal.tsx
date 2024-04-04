import React, { FunctionComponent, useState } from 'react';
import { Pressable, StyleSheet, Text, Modal, View } from 'react-native';
import { PressableText } from './PressableText';


type ModalProps={
    activator?: FunctionComponent<{
        handleOpen : ()=>void
    }>,
    children: React.ReactNode

}

export function CustomModal({
    activator:Activator, 
    children

}: ModalProps) {

    const [isModalVisible, setModalVisible] = useState(false);
 
 
    return (
        <>
        <Modal visible={isModalVisible}
            transparent={false}
            animationType='slide'> 

            <View style={styles.centerView}>
 
                <View style={styles.contentView}>
                 {children} 
                </View>


                <PressableText 
                    onPress={() => setModalVisible(false)} 
                    text="Close" >
                </PressableText>

            </View>        
      </Modal> 
      {
        Activator ? 
        <Activator handleOpen={ () =>  setModalVisible(true)} />
         : 
         <PressableText 
           onPress={() => setModalVisible(true)} 
           text="Open" >
        </PressableText>
      }



      </> 
    );

  
}

const styles = StyleSheet.create({
    link:{
     fontSize: 15,
     fontWeight: 'normal',
     fontFamily: "montserrat-bold",
     textDecorationLine: 'underline'
    },
    centerView:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      contentView:{ 
       marginBottom: 20
      }
  
  })