import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { theme } from "../../assets/utils/theme";
import Intro from "../../Components/BusinessDetails/Intro";
import ActionButton from "../../Components/BusinessDetails/ActionButton";
import About from "../../Components/BusinessDetails/About";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
        headerShown: false,
      });
    getBusinessDetailById();
  }, []);

  //Get Business Details By Id
  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Business Data:", docSnap.data());
        setBusiness(docSnap.data()); // Save the data directly
        setLoading(false);
      } else {
        console.log("No such document!");
      }
  };

  return (
    <View>
      {loading?
      <ActivityIndicator style={{marginTop:'20%'}} size={"large"} color={theme.primaryColor}/>:
      <View>
        <Intro business={business}/>
        <ActionButton business={business}/>
        <About business={business}/>
      </View>
      }
    </View>
  );
}
