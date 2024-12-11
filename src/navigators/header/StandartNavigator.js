import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import hRight from "./part/HeaderCartRight";
import HeaderCartRight from "./part/HeaderCartRight";
import HeaderLeftBack from "./part/HeaderLeftBack";

const Stack = createStackNavigator();

export default function StandartNavigator({
  component,
  logo,
  textTitle = "",
  name,
}) {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={name}
        component={component}
        options={{
          headerTitleAlign: "center",
          headerLeft: () => (
           <HeaderLeftBack/>
          ),
          headerStyle: {
            backgroundColor: "#5C3EBC",
          },
          headerTitle: () => (
            <View>
              {logo ? (
                <Image
                  resizeMode="contain"
                  className="w-16 h-6"
                  source={require("../../../assets/logo.png")}
                />
              ) : (
                <Text className="text-white font-semibold text-lg">
                  {textTitle}
                </Text>
              )}
            </View>
          ),
          headerRight: () => <HeaderCartRight />,
        }}
      />
    </Stack.Navigator>
  );
}
