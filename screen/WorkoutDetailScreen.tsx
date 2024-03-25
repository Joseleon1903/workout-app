import { useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'



type DetailParams ={
    route:{
        params:{
            slug:string
        }
    }
}
export default function WorkoutDetailScreen({ route} : NativeStackHeaderProps & DetailParams) {

    useEffect( () => {
    console.log("initialized PlannerScreen..");


    return () =>  console.log("Unmounting activity PlannerScreen..");
    }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Slug - {route.params.slug} </Text>


    </View>
  );
} 

const styles = StyleSheet.create({
    container: {
             padding: 20,
             flex: 1
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold"
    }


})