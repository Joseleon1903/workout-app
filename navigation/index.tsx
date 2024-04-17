import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// screen
import HomeScreen from './../screen/HomeScreen'
import PlannerScreen from './../screen/PlannerScreen'
import WorkoutDetailScreen from '../screen/WorkoutDetailScreen';

export default function Navigation() {

return (

  <NavigationContainer>

   <RootNavigator/>

  </NavigationContainer>

)}

const Stack = createNativeStackNavigator();

function RootNavigator(){

    return (

     <Stack.Navigator>

            <Stack.Screen name="Root"
                          component={BottomTabNavigator}
                          options={{headerShown : false}}/>


            <Stack.Screen name="WorkoutDetail"
                          component={WorkoutDetailScreen}
                          options={{title : "Detail"}}
                          />

        </Stack.Navigator>
    )
} 

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator(){

return (
    <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen name="Home"
                          component={HomeScreen}
                          options={{unmountOnBlur : false,
                                    tabBarIcon: () =><AntDesign name="appstore1" size={24} color="black" />
                              }}/>

            <BottomTab.Screen name="Planner"
                          component={PlannerScreen}
                          options={{unmountOnBlur : true,
                                    tabBarIcon: () =><FontAwesome5 name="clipboard-list" size={24} color="black" />}}/>

    </BottomTab.Navigator>


)
}

