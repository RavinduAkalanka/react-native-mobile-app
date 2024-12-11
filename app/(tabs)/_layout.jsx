import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { theme } from '../../assets/utils/theme';

export default function TabLaout() {
  return (
    <Tabs screenOptions={{headerShown:false,
      tabBarActiveTintColor: theme.primaryColor,
    }}>
        <Tabs.Screen name="home" options={{
          tabBarLabel:"Home",
          tabBarIcon:({color})=><Entypo name="home" size={24} color={color} />
        }}/>
        <Tabs.Screen name="explore" options={{
          tabBarLabel:"Explore",
          tabBarIcon:({color})=><MaterialIcons name="explore" size={24} color={color} />
        }}/>
        <Tabs.Screen name="profile" options={{
          tabBarLabel:"Profile",
          tabBarIcon:({color})=><FontAwesome name="user" size={24} color={color} />
        }}/>
    </Tabs>
  )
}