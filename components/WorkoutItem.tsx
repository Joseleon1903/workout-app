import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { formatSec, secToMin } from '../utils/time';
import Workout from '../types/data';
import { ReactNode } from 'react';
import { StyleProps } from 'react-native-reanimated';

export default function WorkoutItem({item, children, childStyles = {}} : { item : Workout, children?: ReactNode, childStyles? :StyleProp<ViewStyle> }) {

  return (
     <View style={styles.container}>
         <Text style={styles.name}>{item.name}</Text>
         <Text style={styles.difficulty}>Time: {formatSec(item.duration)}</Text>
         <Text style={styles.difficulty}>{item.difficulty}</Text>

         {
           children && <View style={childStyles}>{children}</View>
         }
     </View>
  );
}


const styles = StyleSheet.create({
       container: {
              borderRadius: 10,
              borderColor: "rgba(0,0,0)",
              borderWidth: 1,
              padding:10,
              marginBottom : 10,
              backgroundColor : "#fff"
       },
       name: {
               fontSize: 15,
               fontWeight: "bold",
               marginBottom : 5
      },
      difficulty: {
              fontSize: 15
      }


})