import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { apiUrl, pb } from "../lib/pocketbase";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail() {
  const { product } = useRoute().params;
  const [selectedProduct, setSelectedProduct] = useState(product.id);
  const [quantity, setQuantity] = useState(1);
  const { currentUser } = useAuth();
  const { fetchCart } = useCart();

  function increaseQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }
  function decreaseQuantity() {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  }

  async function handleAddtoCart() {
    if (!currentUser) {
      alert("Giriş Yap");
      return;
    }
    try {
      const records = await pb.collection("cart").getFullList({
        filter: ` user = "${currentUser.id}" && product = "${product.id}" `,
      });

      if (records.length > 0) {
        const existingRecord = records[0];
        const updateQuantity = existingRecord.quantity + quantity;
        const record = await pb.collection("cart").update(existingRecord.id, {
          quantity: updateQuantity,
        });
      } else {
        const data = {
          quantity: quantity,
          product: product.id,
          user: currentUser.id,
        };

        await pb.collection("cart").create(data);
      }
      await fetchCart();
    } catch (error) {
      console.log("Failed to add to cart");
    }
  }

  return (
    <ScrollView>
      <View className="p-4">
        <ScrollView horizontal className="flex-row mb-4">
          {product.images.map((image, index) => {
            return (
              <Image
                key={index}
                source={{
                  uri: `${apiUrl}/api/files/${product.collectionId}/${product.id}/${image}`,
                }}
                style={{
                  height: 400,
                  width: 400,
                  marginBottom: 3,
                }}
              />
            );
          })}
        </ScrollView>
        <Text className="text-3xl font-bold text-getirClone">
          {product.name}
        </Text>

        <Text className="text-gray text-xs mt-1">1 {product.type}</Text>
        <View className="flex-row my-3 items-center gap-5">
          <Text className="line-through text-gray text-lg ">
            {product.price} {"\u20ba"}
          </Text>
          <Text className=" text-getirClone text-2xl ">
            {product.sellingPrice} {"\u20ba"}
          </Text>
        </View>
        <Text className="text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ratione
          eveniet. Quas atque explicabo fugit quod obcaecati consequuntur hic
          sed asperiores, sunt magni. Aspernatur, quae ab sed deleniti impedit
          consequatur?
        </Text>

        <View className="flex-row items-center mt-5">
          <TouchableOpacity
            onPress={decreaseQuantity}
            className="bg-gray-300 p-2 rounded-lg"
          >
            <Text className="text-xl font-bold text-gray-800">-</Text>
          </TouchableOpacity>
          <Text className="text-lg mx-4 font-bold text-gray-800">
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            className="bg-gray-300 p-2 rounded-lg"
          >
            <Text className="text-xl font-bold text-gray-800">+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleAddtoCart}
          className="mt-8 bg-getirClone p-4 rounded-lg items-center"
        >
          <Text className="text-xl font-bold text-getirText">Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
