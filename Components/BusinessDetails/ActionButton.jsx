import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function ActionButton({business}) {

    const actionButtonMenu = [
        {
            id:1,
            name:'Call',
            icon:require('./../../assets/images/phone.png'),
            url:'tel:'+business.contact
        },
        
        {
            id:2,
            name:'Location',
            icon:require('./../../assets/images/placeholder.png'),
            url:'https://www.google.com/maps?'+business.address
        },
        {
            id:3,
            name:'Web',
            icon:require('./../../assets/images/internet.png'),
            url:business.website
        },
        {
            id:4,
            name:'Share',
            icon:require('./../../assets/images/share.png'),
        }
    ]

    const onPressHandler = (item) =>{
        if(item.name == 'share')
        {
            return;
        }
        Linking.openURL(item.url)
    }

  return (
    <View style={{
        backgroundColor:'#fff',
        padding:20
    }}>
        <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item,index})=>(
            <TouchableOpacity key={index} onPress={()=>{onPressHandler(item)}} style={{ alignItems: 'center', flex: 1, marginBottom: 10 }}>
                <Image source={item?.icon} 
                style={{
                    width:30,
                    height:30
                }}/>
                <Text style={{fontFamily:'outfit-medium',alignItems:'center',marginTop:4}}>{item?.name}</Text>
            </TouchableOpacity>
        )}
        />
    </View>
  )
}