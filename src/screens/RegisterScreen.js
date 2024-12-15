import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [error, setError] = useState();
  const [email, setEmail] = useState("sezerlimanlar@mail.com");
  const [name, setName] = useState("Sezer");
  const [username, setUsername] = useState("Sezz");
  const [password, setPassword] = useState("123123123");
  const [confirmPassword, setConfirmPassword] = useState("123123123");

  const navigation = useNavigation();

  async function handleLoginNavigate() {
    navigation.navigate("BottomTabs", { screen: "Login" });
  }

  async function handleRegister() {
    setError(null);
    try {
      const postData = {
        username: username,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: confirmPassword,
        name: name,
      };
      await register(postData);
    } catch (error) {
      setError(error.message || "Failed to register");
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
        <Text className="font-semibold text-white text-3xl mt-20 ">Kayıt Ol</Text>
        <TouchableOpacity onPress={handleLoginNavigate} className="p-2 mb-8">
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Hesabınız var mı?
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Ad Soyad"
          value={name}
          onChangeText={setName}
          className="w-full px-4 mt-3 bg-white mb-2 rounded-lg"
        />
        <TextInput
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          className="w-full px-4 mt-2 bg-white mb-2 rounded-lg"
        />
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
        <TextInput
          placeholder="Tekrar Şifre"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full px-4 mt-2 bg-white mb-2 rounded-lg"
          secureTextEntry
        />
        <TouchableOpacity
          className="w-full p-3 mt-4 bg-getirText"
          onPress={handleRegister}
        >
          <Text className="text-black  text-xl font-semibold text-center">
            Kayıt Ol
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
