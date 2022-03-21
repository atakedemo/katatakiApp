import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
//import Header from '../../common/Header';
//import PresentCamera from '../../common/PresentCamera';

const MyPage : React.FunctionComponent = () => {
  //const [imgUrl, setImgUrl] = useState([null]);
  return (
    <View style={styles.container}>
      <Text>フォロー一覧(近日実装予定)</Text>
      {/*
      <PresentCamera setImgUrl= {setImgUrl}/>
       {imgUrl &&
          <Image source={{uri: 'data:image/jpeg;base64,' + imgUrl}} style={{ width: 250, height: 250,margin: 20}} />
        }
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'aliceblue',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default MyPage