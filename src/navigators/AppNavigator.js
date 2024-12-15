import { View, Text, Image } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import CartScreen from "../screens/CartScreen";
import StandartNavigator from "./header/StandartNavigator";
import CartNavigator from "./header/CartNavigator";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import HeaderLeftBack from "./header/part/HeaderLeftBack";
import HeaderCartRight from "./header/part/HeaderCartRight";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomNavigator} />

      <Stack.Screen name="Cart">{() => <CartNavigator />}</Stack.Screen>

      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <View>
              <Image
                resizeMode="contain"
                className="w-16 h-6"
                source={require("../../assets/logo.png")}
              />
            </View>
          ),
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftBack />,
          headerRight: () => <HeaderCartRight />,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <View>
              <Image
                resizeMode="contain"
                className="w-16 h-6"
                source={require("../../assets/logo.png")}
              />
            </View>
          ),
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftBack />,
          headerRight: () => <HeaderCartRight />,
        }}
      ></Stack.Screen>

      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
