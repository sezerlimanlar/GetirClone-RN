import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import { Image, View } from "react-native";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#5C3EBC",
          },
          headerTitle:()=>(
            <View><Image resizeMode="contain" className="w-16 h-6" source={require("../../../assets/logo.png")}/></View>
          )
        }}
      />
    </Stack.Navigator>
  );
}
