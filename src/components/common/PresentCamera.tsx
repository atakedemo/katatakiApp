import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Auth, API } from 'aws-amplify';
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

{/*ToDo: 撮影後に写真をアップロードする*/}
const PresentCamera : React.FunctionComponent = props => {
  //プレゼント操作：写真のアップロード
  const uploadImg = async (data, img, index:number) => {
    const apiName = 'APIGateway';
    const path = '/dev/presents/uploadimgs-receive';
    //data['present_images'][index] = 'data:image/jpeg;,' + img
    data['present_images']= ['data:image/jpeg;base64,' + img, 'XXX']
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
      body: data,
    };
    //console.log(data['present_images'])
    //console.log(reqInfo)
    API.post(apiName, path, reqInfo)
    .then(response => {
      console.log(response);
      //console.log(JSON.parse(response.body));
      props.setTmpPresent(JSON.parse(response.body).Attributes);
      props.updatePresentList(response);
      props.setIsVisibleImg(false)
    })
    .catch(err => {
      console.log(err);
    }); 
  }

  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true ,fixOrientation:true};
    const data = await camera.takePictureAsync(options);
    var tmpPresentImg = props.tmpPresent
    {/*写真アップロードAPIの実行処理->返却された値をtmpPresentへセットする*/}
    uploadImg(tmpPresentImg, data.base64, 0)
    //props.setTmpPresent(tmpPresentImg)
    //props.setTmpPresent(data.base64)
    //props.setIsVisibleImg(false)
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