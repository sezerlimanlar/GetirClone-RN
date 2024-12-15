import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {}
    console.log("Failed to log out", error);
  }
  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-4xl">Hesabım</Text>
      {currentUser ? (
        <>
          <View className="mt-11 ">
            <Text>Name: {currentUser.name}</Text>
            <Text>Email: {currentUser.email}</Text>
            <Button title="Çıkış" onPress={logout}></Button>
          </View>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}
