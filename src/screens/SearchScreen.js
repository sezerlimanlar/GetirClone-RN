import { View, Text, TextInput, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { pb } from "../lib/pocketbase";
import ProductItem from "../components/product/ProductItem";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  const fetchProducts = async (value) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const filter = `name ~ "${value}"`;
      const records = await pb.collection("products").getFullList({
        filter,
        signal,
      });
      setProducts(records);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching sliders:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
    }
  };

  function handleQueryChange(value) {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (value.length > 2) {
        fetchProducts(value);
      } else {
        setProducts([]);
      }
    }, 500);
  }
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Ürün Ara"
        value={query}
        onChangeText={handleQueryChange}
        className="border border-slate-300 p-2"
      />
      <FlatList
        data={products}
        className="flex mb-20"
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
}
