import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function SubCategoryBox({ active, item, onPress }) {
  return (
    <TouchableOpacity
      className="my-3"
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 2,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "rgba(149, 86, 158, 0.25)",
          backgroundColor: active ? "#5D38BE" : "white",
        },
      ]}
    >
      <Text
        className="text-sm p-2"
        style={{
          color: active ? "white" : "#5D38BE",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
}
