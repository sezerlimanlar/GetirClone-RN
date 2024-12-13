import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import SubCategoryBox from "./SubCategoryBox";

const { width: screenWidth, height: ScreenHeight } = Dimensions.get("window");

export default function SubCategoryFilter({ category, onSubCategorySelect }) {
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const records = await pb.collection("subcategories").getFullList({
          filter: `category = "${category.id}"`,
        });
        setSubcategories(records);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching sliders:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
    };
    fetchCategories();
  }, [category.id]);

  return (
    <ScrollView
      className="w-full bg-white px-4"
      horizontal={true}
      bounces={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ height: ScreenHeight * 0.065 }}
    >
      {subcategories.map((item) => (
        <SubCategoryBox
          item={item.name}
          active={item.id === activeSubcategoryId}
          key={item.id}
          onPress={() => {
            setActiveSubcategoryId(item.id);
            onSubCategorySelect(item.id);
          }}
        />
      ))}
    </ScrollView>
  );
}
