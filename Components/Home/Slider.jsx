import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setSliderList(data);
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 25,
        }}
      >
        #Special for you
      </Text>

      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 10,
          marginRight: 10,
          marginLeft: 10,
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 250,
              height: 150,
              marginBottom: 10,
              borderRadius: 15,
              margin: 5,
            }}
          />
        )}
      />
    </View>
  );
}
