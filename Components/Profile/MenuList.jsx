import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';

export default function MenuList() {
  const router = useRouter();

  const MenuClick = (item) => {
    router.push(item.path)
  }
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "/AddBusiness/AddBusines",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business.png"),
      path: "/MyBusiness/MyBusiness",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/sharebi.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "",
    },
  ];
  return (
    <View style={{
      marginTop: 30
    }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderWidth: 1,
              margin: 10,
              borderRadius: 12,
              backgroundColor: "#CCCCFF",
            }}
            onPress={() => MenuClick(item)}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{
        fontFamily: 'outfit-regulara',
        fontSize: 14,
        color: '#8F8F8F',
        textAlign: 'center',
        marginTop: '25%'
      }}>
        Developed by RavinduAkalanka @ 2024
      </Text>
    </View>
  );
}
