import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { where } from "firebase/firestore";
import BusinessListCard from "../../Components/BusinessListCard/BusinessListCard";
import { theme } from "../../assets/utils/theme";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  //Use to get business list by category
  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      //console.log("Fetched Category Data:", doc.data());
      data.push({ id: doc?.id, ...doc.data() }); //get firbase document id
    });
    setLoading(false);
    setBusinessList(data);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator style={{ marginTop: '20%' }} size={"large"} color={theme.primaryColor} />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            textAlign: "center",
            color: theme.Gray,
            marginTop: "0%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}
