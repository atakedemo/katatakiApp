import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Header from '../../common/Header';
import PresentCamera from '../../common/PresentCamera';
//import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const MyPage : React.FunctionComponent = () => {
  const [imgUrl, setImgUrl] = useState([null]);

  return (
    <View style={styles.container}>
      <Text>フォロー一覧(近日実装予定)</Text>
      <PresentCamera setImgUrl= {setImgUrl}/>
      {/*
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'カメラへのアクセス許可'}
        permissionDialogMessage={'カメラへのアクセス許可が必要です'}
      >
         {({ camera, status }) => {
           if (status !== 'READY') return <PendingView />;
           return (
             <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
               <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                 <Text style={{ fontSize: 14 }}> 撮影 </Text>
               </TouchableOpacity>
             </View>
           );
         }}
       </RNCamera>
        */}

       {/*撮影した写真の表示->デフォルトの画像設定すれば問題解決しそう*/}
       {imgUrl &&
          <Image source={{uri: 'data:image/jpeg;base64,' + imgUrl}} style={{ width: 250, height: 250,margin: 20}} />
        }
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