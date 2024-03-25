import React from 'react';
import { StyleSheet, Text } from 'react-native';


export function MontserratText({children} : {children : React.ReactNode}) {
 
      return (
        <Text style={styles.header}> {children}</Text>
      );
  
    
  }

  const styles = StyleSheet.create({
    header:{
     fontSize: 20,
     marginBottom: 20,
     fontWeight: "bold",
     fontFamily: "montserrat-bold"
    }


})