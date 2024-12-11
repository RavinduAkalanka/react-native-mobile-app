import { View, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../../assets/utils/theme";
import { useRouter } from "expo-router";
import React from 'react'

export default function ExploreBusinessListCard({business}) {
    const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display:'flex',
        flexDirection:'row',
        gap:10,
      }}
      onPress={() => {
        router.push(`/BusinessDetails/${business.id}`);
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: 150,
          height: 100,
          borderRadius: 15,
        }}
      />
      <View style={{
        flex:1,
        gap:3
      }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 17,
          }}
        >
          {business.name}
        </Text>

        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 13,
            color: theme.Gray,
          }}
        >
          {business.address}
        </Text>

        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/images/star.png")}
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text style={{ fontFamily: "outfit-regular" }}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}