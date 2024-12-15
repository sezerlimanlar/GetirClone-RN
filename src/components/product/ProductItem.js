import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Touchable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { apiUrl } from "../../lib/pocketbase";
import { Entypo } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ProductItem({ product }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ width: screenWidth * 0.285, height: screenHeight * 0.3 }}
      className="mt-3 flex items-start mx-2 rounded-xl bg-white p-3"
      onPress={() => navigation.navigate("ProductDetail", { product })}
    >
      <Image
        source={{
          uri: `${apiUrl}/api/files/${product.collectionId}/${product.id}/${product.images[0]}`,
        }}
        className="w-full rounded-xl"
        style={{
          height: screenWidth * 0.3,
          marginBottom: 3,
        }}
      />
      <View className="flex-row items-center my-2 ">
        <Text className="line-through text-gray text-[13px] ">
          {product.price} {"\u20ba"}
        </Text>
        <Text className=" text-getirClone text-[16px]">
          {product.price} {"\u20ba"}
        </Text>
      </View>
      <Text>{product.name}</Text>
      <Text className="text-gray text-xs mt-1">1 {product.type}</Text>

      <TouchableOpacity
        style={{
          right: -1,
          width: 27,
          height: 27,
        }}
        className="absolute border rounded-full justify-center flex-row items-center border-getirClone "
      >
        <Entypo name="plus" size={22} color="#5D3EBD" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
