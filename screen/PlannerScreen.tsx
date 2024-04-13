import { useEffect} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import WorkoutForm, { ExerciseForm } from '../components/styled/WorkoutForm';



export default function PlannerScreen({navigation} : NativeStackHeaderProps) {


    const handlerFormSubmit = (form: ExerciseForm) => {
      console.log("process form")
      console.log("name: "+ form.name);
      console.log("duration: "+form.duration);


    } 

    useEffect( () => {
      console.log("initialized PlannerScreen..");

      return () =>  console.log("Unmounting activity PlannerScreen..");
    }, [])

  return (
    <View style={styles.container}>

      <WorkoutForm onSubmit={handlerFormSubmit}></WorkoutForm>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20


  }







})