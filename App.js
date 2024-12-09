import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View className="flex-1 pt-44">
        <Text className="text-slate-400 bg-red-200">
          Open up App.js to startt working on your app!
        </Text>
      </View>
    </>
  );
}
