import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../Components/Home/Header'
import Slider from '../../Components/Home/Slider'
import Category from '../../Components/Home/Category'
import PopularBusiness from '../../Components/Home/PopularBusiness'

export default function home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header/>
      <Slider/>
      <Category/>
      <PopularBusiness/>
    </ScrollView>
  )
}