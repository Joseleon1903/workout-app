import { useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'

export default function PlannerScreen({navigation} : NativeStackHeaderProps) {

    useEffect( () => {
    console.log("initialized PlannerScreen..");


    return () =>  console.log("Unmounting activity PlannerScreen..");
    }, [])

  return (
    <View>
      <Text>I am Planner screen</Text>

      <Button title="Go to the home"
              onPress={() => navigation.navigate("Home")}
            />

    </View>
  );
}