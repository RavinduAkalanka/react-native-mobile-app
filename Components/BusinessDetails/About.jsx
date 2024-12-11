import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        backgroundColor:'#fff',
        padding:20,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>About</Text>
      <Text style={{
        fontFamily:'outfit-regular',
        lineHeight:20
      }}>{business?.about}</Text>
    </View>
  )
}