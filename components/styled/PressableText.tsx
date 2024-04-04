import React from 'react';
import { Pressable, StyleSheet, Text, PressableProps } from 'react-native';


export function PressableText(props: PressableProps & {text: string}) {
 
    return (
        <Pressable
           {...props}
        >

            <Text style={styles.link}>
                {props.text}
            </Text>

        </Pressable>
    );

  
}

const styles = StyleSheet.create({
  link:{
   fontSize: 15,
   fontWeight: 'normal',
   fontFamily: "montserrat-bold",
   textDecorationLine: 'underline'
  }
})