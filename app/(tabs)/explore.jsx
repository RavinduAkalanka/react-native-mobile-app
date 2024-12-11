import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { theme } from "../../assets/utils/theme";
import Category from '../../Components/Home/Category';
import { db } from "../../Config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ExploreBusinessList from '../../Components/Explore/ExploreBusinessList';
import { ScrollView } from 'react-native-virtualized-view';

export default function explore() {
  const [businessList,setBusinessList] = useState([])


  const getBusinessByCategory=async(category)=>{
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc)=>{
      data.push({ id: doc.id, ...doc.data()})
    });
    setBusinessList(data);
  }
  
  return (
    <ScrollView style={{
      padding:20,
    }}>
      <Text
      style={{
        fontFamily:'outfit-bold',
        fontSize:26,
      }}>Explore More</Text>

      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 8,
          paddingHorizontal: 10,
          marginTop:10,
          borderWidth:1,
          borderColor:theme.primaryColor,
          marginBottom:20
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
            fontFamily:'outfit-regular',
            
          }}
        />
      </View>

      {/*Category List*/}
      <Category explore={true} 
      onCategorySelect={(category)=>getBusinessByCategory(category)}/>

      {/* Business List */}
      <ExploreBusinessList businessList={businessList} />
     
    </ScrollView>
  )
}