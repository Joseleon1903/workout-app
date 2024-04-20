import { useEffect, useState } from "react";
import Workout from "../types/data";
import { getWorkouts, getWorkoutsBySlug } from "../storage/workout";

import { useIsFocused } from "@react-navigation/native";

export const useWorkoutBySlug = (slug: string) => {
  const [workout, setWorkout] = useState<Workout>();

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("initialized useWorkouts..");

    async function getData() {
      const _workout = await getWorkoutsBySlug(slug);
      setWorkout(_workout);
    }

    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return workout;
};
