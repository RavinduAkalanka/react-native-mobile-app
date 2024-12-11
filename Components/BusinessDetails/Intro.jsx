import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function Intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 15,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <AntDesign name="heart" size={30} color="white" />
      </View>

      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: "100%",
          height: 280,
        }}
      />

      <View 
      style={{
        padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:25,
        borderTopEndRadius:25
        }}>
        <Text style={{fontFamily:'outfit-bold',fontSize:26}}>{business.name}</Text>
        <Text style={{fontFamily:'outfit-regular',fontSize:18}}>{business.address}</Text>
      </View>
    </View>
  );
}
