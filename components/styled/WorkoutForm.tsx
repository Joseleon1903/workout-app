import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./PressableText";

export type WorkoutFormData = {
  name: string;
};
type WorkoutProps = {
  onSubmit: (form: WorkoutFormData) => void;
};

export default function WorkoutForm({ onSubmit }: WorkoutProps) {

  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.container}>

          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Workout Name"
              />
            )}
          />
          
        <PressableText
          style={{marginTop: 10}}
          text="Confirm"
          onPress={handleSubmit((data) => {
            console.log(data);
            onSubmit(data as WorkoutFormData);
          })}
        ></PressableText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    width: 200,
    height: 30,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.4)",
  }
});
