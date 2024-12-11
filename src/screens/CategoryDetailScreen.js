import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import CategoryFilter from "../components/CategoryFilter";

export default function CategoryDetailScreen() {
  const { category } = useRoute().params;

  return (
    <View>
      <CategoryFilter category={category} />
      <Text>{category.name}</Text>
    </View>
  );
}
