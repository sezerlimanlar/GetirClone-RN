import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [error, setError] = useState();
  const [email, setEmail] = useState("sezerlimanlar@mail.com");
  const [password, setPassword] = useState("123123123");

  const navigation = useNavigation();

  async function handleLoginNavigate() {
    navigation.navigate("Register");
  }

  async function handleLogin() {
    setError(null);
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message || "Failed to login");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center px-8  bg-getirClone">
        <Image
          resizeMode="contain"
          className="w-32 h-16"
          source={require("../../assets/logo.png")}
        />
        <Text className="font-semibold text-white text-3xl mt-20 ">
          Giriş Yap
        </Text>
        <TouchableOpacity onPress={handleLoginNavigate} className="p-2 mb-8">
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Henüz hesabınız yok mu?
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full px-4 mt-2 bg-white mb-2 rounded-lg"
        />
        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          className="w-full px-4 mt-2 bg-white mb-2 rounded-lg"
          secureTextEntry
        />
        <TouchableOpacity
          className="w-full p-3 mt-4 bg-getirText"
          onPress={handleLogin}
        >
          <Text className="text-black  text-xl font-semibold text-center">
            Giriş Yap
          </Text>
        </TouchableOpacity>

        {error && (
          <Text className="text-white font-medium bg-red-700 p-4 w-full border text-center mt-4 border-red-950">
            {error}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
