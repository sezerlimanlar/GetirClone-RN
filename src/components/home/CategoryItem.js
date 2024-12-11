import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import { apiUrl } from "../../lib/pocketbase";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CategoryItem({ item }) {
  const navigation = useNavigation();
  function handlePress() {
    navigation.navigate("CategoryDetail", { category: item });
  }
  return (
    <TouchableOpacity
      onPress={handlePress}
      className=" justify-center items-center mb-3 mr-1"
    >
      <Image
        source={{
          uri: `${apiUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`,
        }}
        style={{
          width: 85,
          height: 85,
          marginBottom: 3,
        }}
      />
      <Text className="text-xs text-center">{item.name}</Text>
    </TouchableOpacity>
  );
}
