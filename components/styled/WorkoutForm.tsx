import { useState } from "react"
import {View, Text,TextInput, StyleSheet} from "react-native"
import { PressableText } from "./PressableText";


export type ExerciseForm={
    name: string,
    duration:string
}
type WorkoutProps= {
    onSubmit : (form : ExerciseForm)=>void
}

export default  function WorkoutForm( { 
    onSubmit
}: WorkoutProps) {


    const [form, setForm] = useState({
        name:"",
        duration: ""
    })

    const onChangeText =(name:string) =>(text: string) =>{
        console.log(name);
        console.log(text);

        setForm({
            ...form,
            [name]: text
        })
        
    }


    return (

        <View style={styles.container}>
            <Text> Exercise Form </Text>

            <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={onChangeText("name")}
            
            />

            <TextInput
                style={styles.input}
                value={form.duration}
                onChangeText={onChangeText("duration")}
            />

            <PressableText text="Submit" onPress={() => {onSubmit(form)}}></PressableText>


        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10
    },
    input:{
        height:40,
        margin:22,
        borderWidth: 1,
        padding: 10
    }
  
  })