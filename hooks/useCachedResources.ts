import { useEffect, useState } from "react";
import * as Font from "expo-font";
// data import
import { clearWorkout, getWorkouts, initWorkout } from "../storage/workout";

export default function useCachedResources() {
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

  useEffect(() => {
    console.log("executed useEffect");

    async function loadResourcesAndDataAsync() {
      //loading font from assets
      try {
        initWorkout();

        await Font.loadAsync({
          montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        getWorkouts();
        setIsLoadingCompleted(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingCompleted;
}
