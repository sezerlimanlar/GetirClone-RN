import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryBox({ active, item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 9,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        },
        active && { backgroundColor: "#5D38BE", borderRadius:30, marginVertical:10 },
      ]}
    >
      <Text className="text-sm font-semibold text-white">{item.name}</Text>
    </TouchableOpacity>
  );
}
