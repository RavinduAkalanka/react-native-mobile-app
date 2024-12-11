import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../../assets/utils/theme";
import {useRouter} from 'expo-router';

export default function PopularBusinessCard({ business }) {
  const router = useRouter()
  return (
    <TouchableOpacity
     onPress={()=>router.push(`/BusinessDetails/${business.id}`)}
      style={{
        alignItems: "center",
        margin: 10,
      }}
    >
      <View
        style={{
          padding: 13,
          marginBottom: 5,
          backgroundColor: "#fff",
          borderRadius: 15,
        }}
      >
        <Image
          source={{ uri: business?.imageUrl }}
          style={{
            width: 200,
            height: 130,
            borderRadius: 15,
          }}
        />
        <View
          style={{
            marginTop: 7,
            paddingLeft: 3,
            gap: 3,
          }}
        >
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
          <View style={{ display: "flex", flexDirection: "row", justifyContent:'space-between' }}>
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
            <Text style={{
                fontFamily:'outfit-regular',
                fontSize:13,
                backgroundColor:theme.primaryColor,
                borderRadius:15,
                padding:4,
                color:'#fff'
            }}>{business.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
