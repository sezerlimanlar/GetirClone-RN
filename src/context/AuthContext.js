import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const authData = await AsyncStorage.getItem("pocketbase_auth");
        if (authData) {
          const { token, model } = JSON.parse(authData);
          if (token && model) {
            setCurrentUser(model);
            pb.authStore.save(token, model); 
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
  
  async function login(email, password) {
    try {
      const record = await pb
        .collection("users")
        .authWithPassword(email, password);

      await AsyncStorage.setItem(
        "pocketbase_auth",
        JSON.stringify({ token: record.token, model: record.record })
      );

      setCurrentUser(record.record);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function register(data) {
    console.log(data);
    try {
      const record = await pb.collection("users").create(data);
      navigation.navigate("Login");
      console.log(record);
    } catch (error) {
        console.log("Error details:", JSON.stringify(error, null, 2));
      }
      
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("pocketbase_auth");
      setCurrentUser(null);
      navigation.navigate("BottomTabs", { screen: "Login" });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
