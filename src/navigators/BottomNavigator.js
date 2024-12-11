import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import GiftScreen from "../screens/GiftScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomBarNavigation from "./CustomBarNavigation";
import HomeNavigator from "./header/HomeNavigator";
import StandartNavigator from "./header/StandartNavigator";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#5D38BE",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <StandartNavigator component={SearchScreen} name="search" textTitle="Arama" />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="CustomBar"
        component={GiftScreen}
        options={{
          tabBarIcon: () => <CustomBarNavigation />,
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <StandartNavigator component={ProfileScreen} name="profile" textTitle="Profil" />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Gift"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gift" size={size} color={color} />
          ),
        }}
      >
        {() => <StandartNavigator component={GiftScreen} name="gift" logo />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
