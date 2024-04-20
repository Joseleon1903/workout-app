import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { PressableText } from "../components/styled/PressableText";
import { CustomModal } from "../components/styled/CustomModal";
import { formatSec } from "../utils/time";
import { FontAwesome } from "@expo/vector-icons";
import WorkoutItem from "../components/WorkoutItem";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};
export default function WorkoutDetailScreen({
  route,
}: NativeStackHeaderProps & DetailParams) {
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const workout = useWorkoutBySlug(route.params.slug);
  const [trackerIdx, setTrackerIdx] = useState(-1);

  const startupSeq = ["3", "2", "1", "Go!"].reverse();

  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);

  useEffect(() => {
    console.log("Detail Screen : ", countDown);

    if (!workout) {
      return;
    }

    if (trackerIdx === workout.sequence.length - 1) {
      return;
    }

    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  const addItemToSequence = (indx: number) => {
    const newSequence = [...sequence, workout!.sequence[indx]];
    setSequence(newSequence);
    setTrackerIdx(indx);
    start(newSequence[indx].duration + startupSeq.length);
  };

  if (!workout) {
    return null;
  }

  const hasReachedEnd =
    sequence.length === workout.sequence.length && countDown === 0;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{workout.name} </Text> */}
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <CustomModal
          activator={({ handleOpen }: any) => {
            return (
              <PressableText
                onPress={handleOpen}
                text="Check Sequence"
              ></PressableText>
            );
          }}
        >

          { ()=>
                <View>
                  {workout.sequence.map((si, indx) => (
                    <View key={si.slug} style={styles.sequenceItem}>
                      <Text>
                        {" "}
                        {si.name} | {si.type} | {formatSec(si.duration)}
                      </Text>

                      {indx !== workout.sequence.length - 1 && (
                        <FontAwesome name="arrow-down" size={20}></FontAwesome>
                      )}
                    </View>
                  ))}
                </View>
          }
          
        </CustomModal>
      </WorkoutItem>

      <View style={styles.wrapper}>
        <View style={styles.centerView}>
          {sequence.length === 0 ? (
            <FontAwesome
              name="play-circle-o"
              size={100}
              onPress={() => addItemToSequence(0)}
            />
          ) : isRunning ? (
            <FontAwesome
              name="stop-circle-o"
              size={100}
              onPress={() => stop()}
            />
          ) : (
            <FontAwesome
              name="play-circle-o"
              size={100}
              onPress={() => {
                if (hasReachedEnd) {
                  console.log("Restart Counter");
                } else {
                  start(countDown);
                }
              }}
            />
          )}

          {sequence.length > 0 && countDown >= 0 && (
            <View>
              <Text style={{ fontSize: 60 }}>
                {countDown > sequence[trackerIdx].duration
                  ? startupSeq[countDown - sequence[trackerIdx].duration - 1]
                  : countDown}
              </Text>
            </View>
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 60, fontWeight: "bold" }}>
            {sequence.length === 0
              ? "Prepared"
              : hasReachedEnd
              ? "Great Job!"
              : sequence[trackerIdx].name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  sequenceItem: {
    alignItems: "center",
  },
  centerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  wrapper:{
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    borderWidth: 1, 
    padding: 10
  }
});
