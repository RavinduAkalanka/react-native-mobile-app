import { View, FlatList } from 'react-native'
import React from 'react'
import ExploreBusinessListCard from './ExploreBusinessListCard'

export default function ExploreBusinessList({ businessList }) {
  return (
    <View >
      <FlatList
        data={businessList}
        renderItem={({ item, index }) => (
          <View key={index} style={{
            marginBottom:15
          }}>
            <ExploreBusinessListCard business={item} />
          </View>
        )}
      />
    </View>
  )
}
