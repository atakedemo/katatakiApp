import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';

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

const PresentCamera : React.FunctionComponent = props => {
  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true ,fixOrientation:true};
    const data = await camera.takePictureAsync(options);
    props.setImgUrl(data.base64)
    props.setIsVisibleImg(false)
  };

  return (
    <View style={styles.container}>
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

export default PresentCamera