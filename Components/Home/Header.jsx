import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { theme } from "../../assets/utils/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: theme.primaryColor,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
      }}
    >
      {/* Top Row with Profile Image, Welcome Text, and Info Icon */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        {/* Profile Image */}
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
            marginRight: 10,
          }}
        />

        {/* Welcome Text */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#fff" }}>Welcome,</Text>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            {user?.fullName || "Game Play"}
          </Text>
        </View>

        {/* Info Icon */}
        <FontAwesome name="info-circle" size={24} color="#fff" />
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 8,
          paddingHorizontal: 10,
        }}
      >
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search..."
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingLeft: 8,
            fontSize: 16,
            fontFamily:'outfit-regular'
          }}
        />
      </View>
    </View>
  );
}
