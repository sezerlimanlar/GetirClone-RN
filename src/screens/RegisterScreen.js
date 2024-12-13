import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState("sezerlimanlar@mail.com");
  const [name, setName] = useState("Sezer");
  const [username, setUsername] = useState("Sez");

  const navigation = useNavigation();

  async function handleRegister() {}
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex flex-1 justify-center items-center p-8 bg-getirClone">
        <Image
          resizeMode="contain"
          className="w-32 h-16 mb-28"
          source={require("../../assets/logo.png")}
        />
        <Text>Register</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
