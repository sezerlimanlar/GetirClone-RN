import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./src/navigators/BottomNavigator";
import AppNavigator from "./src/navigators/AppNavigator";
import AuthProvider from "./src/context/AuthContext";
import CartProvider from "./src/context/CartContext";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="auto" />
          <View className="mt-8"></View>
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
