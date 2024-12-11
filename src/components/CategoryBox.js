import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryBox({ active, item, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(item);
      }}
      style={[
        {
          paddingHorizontal: 9,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          
        },
        item === active && { borderBottomWidth:5, borderBottomColor: "white" },
      ]}
    >
      <Text className="text-sm font-semibold text-white">{item}</Text>
    </TouchableOpacity>
  );
}
