
import { storeData, getData, containsKey, removeItem } from '../storage';
import Workout from '../types/data';
// data import
import data from './../data/data.json'

export const initWorkout = async () :Promise<boolean> =>{
    const hasWorkouts = await containsKey("workout-data");
    console.log("hasWorkouts: "+ hasWorkouts)
    if(!hasWorkouts){
        console.log("Storing data..");
        await storeData("workout-data", data);
        return true;
    }
    return false;
}

export const getWorkouts = async () : Promise<Workout[]>=>{

    const Workouts = await getData("workout-data");
    console.log("data size: "+ data.length);
    return Workouts;
}

export const clearWorkout= async () : Promise<void>=>{
    await removeItem("workout-data");
    console.log("remove all workout data..")   
}