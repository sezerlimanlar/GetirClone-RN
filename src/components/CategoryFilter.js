import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import CategoryBox from "./CategoryBox";

const { width: screenWidth, height: ScreenHeight } = Dimensions.get("window");

export default function CategoryFilter({ category }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const records = await pb.collection("categories").getFullList({
          sort: "+created",
        });
        setCategories(records);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching sliders:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView
      className="w-full bg-getirClone2 px-4"
      horizontal={true}
      bounces={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ height: ScreenHeight * 0.065 }}
    >
      {categories.map((item) => (
        <CategoryBox
          key={item.id}
          active={category.name}
          item={item.name}
          onPress={(item) => console.log("clicked " + item)}
        />
      ))}
    </ScrollView>
  );
}
