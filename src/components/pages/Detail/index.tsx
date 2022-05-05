import React, { useState, useEffect } from 'react';
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Button, Image, CheckBox} from 'react-native-elements';
//import { Auth, API } from 'aws-amplify';
import { View, StyleSheet, Text, TextInput} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/FontAwesome';

const BASE_URI = 'https://katataki-prod-images.s3.ap-northeast-1.amazonaws.com/sample_cooking.png';

export default function Detail({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="home" size={30} style={styles.icon}/>
      <Card containerStyle={styles.card}>
        <Card.Title>
          {route.params.present['present_name']}
        </Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 15}}>利用者: {route.params.present['user_id_receive']}</Text>
        <Text>コメント: </Text>
        <Text style={{ marginBottom: 15}}>{route.params.present['present_comment']}</Text>
        <Text style={{ marginBottom: 15}}>作成日: {route.params.present['date_created']}</Text>
        <View style={styles.imgList}>
          <Image 
            source={{ uri: route.params.present['present_images'][0] ? route.params.present['present_images'][0] : BASE_URI}}
            containerStyle={styles.item}
            //onPress={() => useTakePicture(0)}
          />
          <Image 
            source={{ uri: route.params.present['present_images'][1] ? route.params.present['present_images'][1] : BASE_URI}}
            containerStyle={styles.item}
            //onPress={() => useTakePicture(0)}
          />
        </View>
        <View style={styles.imgList}>
          <Image 
            source={{ uri: route.params.present['present_images'][3] ? route.params.present['present_images'][2] : BASE_URI}}
            containerStyle={styles.item}
            //onPress={() => useTakePicture(0)}
          />
          <Image 
            source={{ uri: route.params.present['present_images'][3] ? route.params.present['present_images'][3] : BASE_URI}}
            containerStyle={styles.item}
            //onPress={() => useTakePicture(0)}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  card: {
    marginTop: 40,
    marginLeft: 0,
    width: '100%',
  },
  imgList: {
    width: 320,
    marginRight:40,
    backgroundColor: '#ffffff',
    //flex: 1,
    flexDirection: 'row',
    //flexWrap: 'wrap',
  },
  item: {
    aspectRatio: 1,
    width: '50%',
  },
  icon: {
    position: 'absolute',
    left: 0,
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: '#ffffff',
  }
});
