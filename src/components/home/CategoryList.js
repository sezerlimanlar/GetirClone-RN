import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
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
    <View className="bg-getirBg ml-9">
      <View className="flex-row flex-wrap">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
  
}
