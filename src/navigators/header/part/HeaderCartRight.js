import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function HeaderCartRight() {
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate("Cart")}
    className="bg-white p-2 m-2 h-9 flex-row rounded-xl items-center justify-center"
  >
    <Image
      className="w-6 h-9 p-2"
      source={require("../../../../assets/cart.png")}
    />
    <View className="flex flex-col bg-[#F3EFFE] h-9 items-center justify-center">
      <Text> {"\u20BA"}555</Text>
    </View>
  </TouchableOpacity>
  )
}