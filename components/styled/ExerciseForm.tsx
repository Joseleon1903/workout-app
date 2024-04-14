import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./PressableText";

export type ExerciseFormData = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};
type WorkoutProps = {
  onSubmit: (form: ExerciseFormData) => void;
};

const selectionItems =["Exercise","Break", "Stretch" ];

export default function ExerciseForm({ onSubmit }: WorkoutProps) {
  const { control, handleSubmit } = useForm();

  const [isSelectionOn , setSelectionOn] = useState(false);

  return (
    <View style={styles.container}>
      <Text> Exercise Form </Text>

      <View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Name"
              />
            )}
          />

          <Controller
            control={control}
            rules={{ required: true }}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Duration"
              />
            )}
          />
        </View>

        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{ required: false }}
            name="reps"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Repetitions"
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="type"
            render={({ field: { onChange, value } }) => (
                <View style={{flex: 1}}>
                    { isSelectionOn ?
                    <View>
                        {
                            selectionItems.map(selection =>
                                <PressableText style={styles.selection} key={selection} text={selection}  onPressIn={() => {
                                    setSelectionOn(false);
                                    onChange(selection);
                                }
                            }/>
                            )
                        }

                    </View>
                    : 
                    <TextInput
                    onPressIn={() => {setSelectionOn(true)}}
                    style={styles.input}
                    placeholder="Selected"
                    value={value}
                    />
                    }
                </View>

            )}
          />
        </View>

        <PressableText
          text="Submit"
          onPress={handleSubmit((data) => {
            console.log(data);
            onSubmit(data as ExerciseFormData);
          })}
        ></PressableText>
      </View>
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
    flex: 1,
    height: 30,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.4)",
  },
  rowContainer: {
    flexDirection: "row",
  },
  selection:{
    margin: 2,
    padding: 3,
    alignSelf: "center"
  }
});
