import { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Pressable} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'

// data import
import WorkoutItem from './../components/WorkoutItem'
import Workout from './../types/data'

//custom components
import { MontserratText } from '../components/styled/MontserratText';
import { getWorkouts } from '../storage/workout';

export default function HomeScreen({navigation} : NativeStackHeaderProps) {

    const [workouts , setWorkouts] = useState<Workout[]>([]);

    useEffect( () => {
      console.log("initialized HomeScreen..");

      async function getData(){
        const _workouts = await getWorkouts();
        setWorkouts(_workouts);
      }

      getData();

      return () =>  console.log("Unmounting activity HomeScreen..");

    }, [])

  return (
    <View style={styles.container}>

    <MontserratText>New Workouts</MontserratText>

     <FlatList data={workouts as Workout[] }
               renderItem={ ({item}) =>{

                return (
                  <Pressable
                    onPress={() => { navigation.navigate("WorkoutDetail", {slug: item.slug})}}
                  >
                    <WorkoutItem  item={item}/>
                  </Pressable>
                )
              }}
               keyExtractor={item => item.slug } />


      <Button title="Go to the planner"
              onPress={() => navigation.navigate("Planner")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
       container: {
                padding: 20,
                flex: 1
       }


})