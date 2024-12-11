import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { apiUrl, pb } from "../../lib/pocketbase";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SliderCarousel() {
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  });

  /* const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }); */

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const records = await pb.collection("sliders").getFullList({
          sort: "-created",
        });
        setSliders(records);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching sliders:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
    };
    fetchSliders();
  }, []);

  return (
    <FlatList
      data={sliders}
      keyExtractor={(item) => item.id} // Her bir item için benzersiz key
      renderItem={({ item }) => (
        <View style={{ width: screenWidth, height: screenHeight * 0.25 }}>
          <Image
            source={{
              uri: `${apiUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      )}
      horizontal={true} // Slider yatay olarak hareket edecek
      pagingEnabled={true} // Sayfalandırma etkin
      showsHorizontalScrollIndicator={false} // Yatay scroll bar gizli
    />
  );
}
