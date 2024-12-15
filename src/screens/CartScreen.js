import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useCart } from "../context/CartContext";
import { apiUrl } from "../lib/pocketbase";

export default function CartScreen() {
  const { cart, total, increaseQuantity, decreaseQuantity, deleteCartItem } =
    useCart();
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4">
        {cart.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center m-1 bg-slate-300 rounded-lg p-4"
          >
            <Image
              source={{
                uri:
                  item.expand.product.images &&
                  item.expand.product.images.length > 0
                    ? `${apiUrl}/api/files/${item.expand.product.collectionId}/${item.expand.product.id}/${item.expand.product.images[0]}`
                    : "https://via.placeholder.com/150", // Default resim veya hata durumunda gösterilecek resim
              }}
              style={{
                width: 64,
                height: 64,
                marginRight: 16,
                borderRadius: 8,
              }}
            />

            <View className="flex flex-1">
              <Text className="text-lg font-semibold">
                {item.expand.product.name}
              </Text>
              <Text className="text-red-700 font-semibold">
                {item.expand.product.sellingPrice} {"\u20BA"}
              </Text>
            </View>

            <View className="flex-row items-center ml-4">
              <TouchableOpacity
                onPress={() => increaseQuantity(item.expand.product.id)}
                className="bg-getirClone p-2 rounded-lg"
              >
                <Text className="text-xl font-bold text-getirText">+</Text>
              </TouchableOpacity>

              <Text className="text-lg font-bold mx-4 text-getirClone">
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() => decreaseQuantity(item.expand.product.id)}
                className="bg-getirClone p-2 rounded-lg"
              >
                <Text className="text-xl font-bold text-getirText">-</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteCartItem(item.expand.product.id)}
                className="p-2 rounded-lg"
              >
                <Text className="text-lg p-2 text-wthite font-bold bg-red-600">
                  x
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="p-8 border-t-2 border-t-black bg-getirClone  ">
        <View className="flex flex-row justify-center mb-4 gap-5">
          <Text className="text-xl font-semibold text-white">Toplam</Text>
          <Text className="text-xl font-semibold text-white">
            {total} {"\u20BA"}
          </Text>
        </View>
        <TouchableOpacity className="items-center justify-center p-4 rounded-xl bg-getirText">
          <Text>Ödeme Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
