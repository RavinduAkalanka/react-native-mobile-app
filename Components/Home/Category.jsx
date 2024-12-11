import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../assets/utils/theme";
import { collection, getDocs, query } from "firebase/firestore";
import CategoryItem from "./CategoryItem";
import { db } from "../../Config/FirebaseConfig";
import { useRouter } from "expo-router";

export default function Category({ explore = false,onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      //cls console.log("Fetched Category Data:", doc.data());
      data.push(doc.data());
    });
    setCategoryList(data);
  };

  const OnCategoryPressHandler = (item) => {
    if(!explore)
    {
      router.push(`/BusinessList/${item.name}`)
    }
    else{
      onCategorySelect(item.name);
    }
  }

  return (
    <View>
      {!explore && (
        <View
          style={{
            paddingBottom: 3,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            Category
          </Text>
          <Text
            style={{
              color: theme.primaryColor,
              fontFamily: "outfit-medium",
            }}
          >
            View all
          </Text>
        </View>
      )}

      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onCategoryPress={()=>OnCategoryPressHandler(item)}
          />
        )}
      />
    </View>
  );
}
