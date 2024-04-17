import { useEffect, useState} from 'react';
import { StyleSheet, View, Button, Text ,FlatList} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import ExerciseForm, { ExerciseFormData } from '../components/styled/ExerciseForm';
import { Difficulty, SequenceItem, SequenceType  } from '../types/data';
import Workout from '../types/data';
import slugify from "slugify"
import ExerciseItem from '../components/ExerciseItem';
import { PressableText } from "../components/styled/PressableText";
import { CustomModal } from '../components/styled/CustomModal';
import WorkoutForm, { WorkoutFormData } from '../components/styled/WorkoutForm';
import { storeWorkout } from '../storage/workout';

export default function PlannerScreen({navigation} : NativeStackHeaderProps) {

  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);

    const handlerFormSubmit = (form: ExerciseFormData) => {
      console.log("process form")
      console.log("name: "+ form.name);
      console.log("duration: "+form.duration);

      const seqItem : SequenceItem= {
        slug: slugify( form.name +" "+ Date.now(), {lower: true}),
        name: form.name,
        type: form.type as SequenceType,
        duration: Number(form.duration)
      };

      if(form.reps){
        seqItem.reps = Number(form.reps);
      }

      console.log(seqItem);
      setSequenceItems([...sequenceItems, seqItem]);
    }

    const computeDifficulty= (excersicesCount: number, workoutDuration : number) : Difficulty =>{
      const diff =  workoutDuration / excersicesCount;
      if(diff <=60 ){
        return "Hard";
      }else if (diff <=100){
        return "Normal"; 
      }else{
        return "Easy";
      }
    }

    const handlerWorkoutSubmit = async (form: WorkoutFormData) =>{
      console.log("submit workoutForm");

      if(sequenceItems.length > 0 ){
        const duration = sequenceItems.reduce((acc , item) =>{
          return acc + item.duration;
        }, 0);
  
        const workout : Workout={
          slug: slugify( form.name +" "+ Date.now(), {lower: true}),
          name: form.name,
          duration: duration,
          difficulty :computeDifficulty(sequenceItems.length, duration),
          sequence : [...sequenceItems]
        }
        console.log(workout);
        storeWorkout(workout);
      }



    }

    useEffect( () => {
      console.log("initialized PlannerScreen..");

      return () =>  console.log("Unmounting activity PlannerScreen..");
    }, [])

  return (
    <View style={styles.container}>

    <FlatList data={sequenceItems}
                renderItem={({item, index}) =>
                  <ExerciseItem item={item}>

                  <PressableText
                            text="Remove"
                            onPress={() => {
                              console.log("Remove item index: "+ index );
                              const items = [...sequenceItems];
                              items.splice(index, 1);
                              setSequenceItems(items);
                            }}
                          ></PressableText>

                  </ExerciseItem>
                }
                keyExtractor={item => item.slug}/>
   
      <ExerciseForm onSubmit={handlerFormSubmit}></ExerciseForm>

      <View>
        <CustomModal  activator={({handleOpen}) =><PressableText style={{marginTop:15}} text="Create Workout" onPress={handleOpen} />}>
          { ({handleClose}) =>
            <View>
              <WorkoutForm onSubmit={async (data) =>{
                handlerWorkoutSubmit(data);
                handleClose();
                navigation.navigate("Home");
              }}>
              </WorkoutForm>
            </View>
          }
          
        </CustomModal>

      </View>


    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  }

})