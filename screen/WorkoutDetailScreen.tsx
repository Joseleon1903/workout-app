import { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug';
import { PressableText } from '../components/styled/PressableText';
import { CustomModal } from '../components/styled/CustomModal';
import { formatSec } from '../utils/time';
import { FontAwesome } from '@expo/vector-icons';
import WorkoutItem from '../components/WorkoutItem';
import { SequenceItem } from '../types/data';
import { useCountDown } from '../hooks/useCountDown';


type DetailParams ={ 
    route:{
        params:{
            slug:string
        }
    }
}
export default function WorkoutDetailScreen({ route} : NativeStackHeaderProps & DetailParams) {

  const [sequence, setSequence]= useState<SequenceItem[]>([]);
  const workout = useWorkoutBySlug(route.params.slug);
  const [trackerIdx, setTrackerIdx]= useState(-1);

  const countDown = useCountDown(
    trackerIdx,
    trackerIdx>= 0 ?sequence[trackerIdx].duration : -1
  )

  const addItemToSequence= (indx : number) =>{
    setSequence([...sequence, workout!.sequence[indx]]);
    setTrackerIdx(indx);
  }


  if(!workout){
    return null;
  }

   
  return (
    <View style={styles.container}>

      {/* <Text style={styles.header}>{workout.name} </Text> */}
      <WorkoutItem item={workout} childStyles={{marginTop:10}}>

      <CustomModal activator={({handleOpen}: any)=>{  
        return <PressableText
          onPress={handleOpen}
          text="Check Sequence"></PressableText>;
        }}>

          <View>
            {
              workout.sequence.map((si, indx) => 
                <View key={si.slug} style={styles.sequenceItem}>
                  <Text> {si.name} | {si.type} | {formatSec(si.duration)}</Text>

                  {
                    indx !== workout.sequence.length -1 && <FontAwesome name='arrow-down' size={20}></FontAwesome>
                  }
                 
                </View>

           )
            }
          </View>
        </CustomModal>


      </WorkoutItem>

      <View>

            {sequence.length ===0 &&

            <FontAwesome name="play-circle-o" 
                         size={100}
                         onPress={() => addItemToSequence(0)}
            
            ></FontAwesome>
            }
      </View>

      

     
 

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
    },
    sequenceItem:{
      alignItems: 'center'

    }

})