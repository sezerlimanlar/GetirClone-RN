import { View, Text, ScrollView } from "react-native";
import React from "react";
import HeaderMain from "../components/home/HeaderMain";
import SliderCarousel from "../components/home/SliderCarousel";
import CategoryList from "../components/home/CategoryList";

export default function HomeScreen() {
  return (
    <>
      <View>
        <HeaderMain />
      </View>
      <ScrollView className="h-full bg-getirBg">
        <SliderCarousel />
        <CategoryList />
      </ScrollView>
    </>
  );
}
