import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function CustomBarNavigation() {
  return (
    <TouchableOpacity className="border-white border-2 rounded-full bg-getirClone p-2 h-14 w-14">
      <Entypo name="list" size={32} color="#FDCA00" />
    </TouchableOpacity>
  );
}
