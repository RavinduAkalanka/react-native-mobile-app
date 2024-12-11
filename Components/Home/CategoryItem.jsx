import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryItem({ category,onCategoryPress }) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}
      style={{
        alignItems: "center", 
        margin: 10,          
      }}
    >
      {/* Icon */}
      <View
        style={{
          padding: 13,
          backgroundColor: "#CCCCFF",
          borderRadius: 50, 
          marginBottom: 5, 
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>

      {/* Name */}
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
