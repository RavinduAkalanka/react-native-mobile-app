import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../assets/utils/theme";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
    const [businessList,setBusinessList] = useState([]);
    useEffect(() => {
        getBusinessList();
      }, []);
    
      const getBusinessList = async () => {
        const q = query(collection(db, "BusinessList"), limit(5));
        const querySnapshot = await getDocs(q);
    
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log("Fetched Category Data:", doc.data());
          data.push({id:doc?.id,...doc.data()});
        });
        setBusinessList(data);
      };
  return (
    <View>
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
          Popular Business
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
      <FlatList
      data={businessList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <PopularBusinessCard business={item} key={index}/>
      )}
      />
    </View>
  );
}
