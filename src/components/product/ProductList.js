import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import ProductItem from "./ProductItem";

export default function ProductList({ categoryId, subcategoryId }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filter = subcategoryId
          ? ` category="${categoryId}" && subcategory ="${subcategoryId}" `
          : ` category="${categoryId}" `;
        const records = await pb.collection("products").getFullList({
          filter,
        });
        setProducts(records);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching sliders:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
    };
    fetchProducts();
  }, [subcategoryId, categoryId]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={products}
      className="flex mb-20"
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
}
