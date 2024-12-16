import { View, Text, Image, TouchableOpacity } from "react-native";
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
import CheckoutScreen from "../screens/CheckoutScreen";
import { AntDesign } from "@expo/vector-icons";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomNavigator} />

      <Stack.Screen name="Cart">{() => <CartNavigator />}</Stack.Screen>

      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              className="m-2"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#5C3EBC",
          },
          headerTitle: () => (
            <View>
              <Image
                resizeMode="contain"
                className="w-16 h-6"
                source={require("../../assets/logo.png")}
              />
            </View>
          ),
        }}
      />

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
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              className="m-2"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#5C3EBC",
          },
          headerTitle: () => (
            <View>
              <Image
                resizeMode="contain"
                className="w-16 h-6"
                source={require("../../assets/logo.png")}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
