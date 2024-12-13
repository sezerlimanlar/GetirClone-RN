import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import CategoryFilter from "../components/CategoryFilter";
import SubCategoryFilter from "../components/SubCategoryFilter";
import ProductList from "../components/product/ProductList";

export default function CategoryDetailScreen() {
  const { category } = useRoute().params;
  const [selectedCategory, setSelectedCategory] = useState(category.id);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  return (
    <View>
      <CategoryFilter
        category={category}
        onCategorySelect={(categoryId) => {
          setSelectedCategory(categoryId);
          setSelectedSubcategory(null);
        }}
      />
      <SubCategoryFilter
        category={{ ...category, id: selectedCategory }}
        onSubCategorySelect={(subcategoryId) =>
          setSelectedSubcategory(subcategoryId)
        }
      />
    <ProductList categoryId={selectedCategory} subcategoryId={selectedSubcategory}/>
    </View>
  );
}
