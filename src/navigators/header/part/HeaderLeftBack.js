import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLeftBack() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="m-2" onPress={() => navigation.goBack()}>
      <Entypo name="chevron-left" size={24} color="white" />
    </TouchableOpacity>
  );
}
