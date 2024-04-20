import { ReactNode } from "react";
import { SequenceItem } from "../types/data";
import { View , StyleSheet, Text} from "react-native";



export default function ExerciseItem({item, children}: {item: SequenceItem, children?:ReactNode }){

    return (
        <View style={styles.container}>
            <Text style={styles.name} > 
            {item.name} {item.reps ? `- ${item.reps}` : ""} - {item.duration} sec | {item.type}
            </Text>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      borderColor: "rgba(0,0,0)",
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    name: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
    }
  });
  