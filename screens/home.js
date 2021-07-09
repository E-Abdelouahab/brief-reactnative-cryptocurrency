import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper'



axios.defaults.headers.common['Accept-Encoding'] = 'gzip'

function Item({ item }) {
  return (
    <View style={{
      paddingHorizontal: 15
    }}>

    
    <View style={{
      backgroundColor: 'white',
      borderRadius: 5,
      elevation: 5,
      marginVertical: 10,
      marginHorizontal: 5,
      padding: 10
  }}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
      }}>
          <View style={{
              flexDirection: 'row',
          }}>
              <View >
              <Image source={{uri: `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}} 
                     style={{
                       width:40, 
                       height:40,
                       borderRadius:30
                }} />

              </View>
              <View>
                  <Text style={{fontSize: 15}}>{item.name}</Text>
                  <Text style={styles.small}>{item.symbol}</Text>
              </View>
          </View>

          <View style={{
              flexDirection: 'column',
              alignItems: 'flex-end'
          }}>
             <Text style={{fontSize: 15, fontWeight: 'bold'}}>${parseFloat(item.priceUsd).toFixed(2)}</Text>
             <Text style={{fontWeight:"bold"},
        
         item.changePercent24Hr > 0
                ? {  color: "green" }
                : {  color: "red" }
        
        }>{parseFloat(item.changePercent24Hr).toFixed(2)} %</Text>
          </View>
      </View>  

  </View>


    
    </View>
  );
}


function ItemSwiper ({item}){
  return (


    <View style={styles.slide1}>
    <View style={{
        flexDirection: 'row'
    }}>
        <View >
        <Image source={{uri: `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}} 
        style={{
          width:40, 
          height:40,
          borderRadius:30
   }} />
        </View>
        <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.small}>{item.symbol}</Text>
        </View>
    </View>
    <View>
        <Text style={styles.priceUsd}>${parseFloat(item.priceUsd).toFixed(2)}</Text>
        <Text style={{fontWeight:"bold"},
        
         item.changePercent24Hr > 0
                ? {  color: "green" }
                : {  color: "red" }
        
        }>{parseFloat(item.changePercent24Hr).toFixed(2)} %</Text>
    </View>
</View>
  )
}
export default function Home({ navigation }) {

 


  const [data, setData] = useState([]);


  const getDataUsingAsyncAwaitGetCall = async () => {
      try {
        const response = await axios.get(
          'https://api.coincap.io/v2/assets?limit=10',
          
          
        );



        let resData = response.data.data

         setData(resData && resData)
      } catch (error) {
        // handle error
        console.log(error.message);
      }
    };

  useEffect(() => {
     getDataUsingAsyncAwaitGetCall();
  });




  

  return (

    <View style={styles.container}>  
    
    <Swiper style={styles.wrapper} showsButtons={true}>
    <FlatList
    style={{flex:1}}
    data={data}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={()=> navigation.push('CryptoDetails', item)} >
      <ItemSwiper item={item}/> 
      </TouchableOpacity>
    )}
    keyExtractor={item => item.id}
  />
    </Swiper>

    <FlatList
      style={{flex:1}}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=> navigation.push('CryptoDetails', item)} >
        <Item item={item}/> 
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  </View>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:0
  },

  wrapper: {
    height: 200,
},
slide1: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    borderWidth: 0.2,
    borderRadius: 3
},
});