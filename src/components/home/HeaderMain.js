import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function HeaderMain() {
  return (
    <View className="flex h-12 flex-row bg-yellow-400 justify-between items-center">
      <View className="w-10/12 h-12 flex-row flex items-center rounded-tr-full p-4 rounded-br-full bg-white">
        <Image
          source={require("../../../assets/house.png")}
          className="w-6 h-6"
        />
        <View className="flex-1 flex flex-row items-center ml-2 h-10 gap-1">
          <Text className="text-xl font-semibold">Ev,</Text>
          <Text className="text-xs text-slate-400 ml-2 font-semibold">Atatürk Mahallesi 1699 Sokak İzmir/Buca</Text>
        </View>
        <View>
            <Entypo className="ml-auto" name="chevron-right" size={18} color="#5D3EBD"/>
        </View>
      </View>

      <View className="w-2/12">
        <Text className="text-xs text-getirClone text-center font-bold">
          TVS
        </Text>
        <Text className="text-xl text-getirClone text-center font-bold">
          15dk
        </Text>
      </View>
    </View>
  );
}
