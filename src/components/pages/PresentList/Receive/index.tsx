import React, { useState, useEffect } from 'react';
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Button, Image, CheckBox } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';
import { View, StyleSheet, Text, TextInput} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import PresentCamera from '../../../common/PresentCamera';
import { DETAIL } from '../../../../constants/screen';

const BASE_URI = 'https://katataki-prod-images.s3.ap-northeast-1.amazonaws.com/sample_cooking.png';

type ListComponentProps = ListItemProps;

const ReceiveList  : React.FunctionComponent<ListComponentProps> = props => {
  const [presents, setPresents] = useState([]); //プレゼント一覧
  const [tmpPresent, setTmpPresent] = useState({
    present_id: '-',
    present_name: '-',
    present_status: {
      owner: '-',
      reciever: "-",
      id: "ph00"
    },
    present_images: [],
    user_id_receive: '-',
    present_comment: '-'
  }) //編集プレゼント情報
  const [tmpIndex, setTmpIndex] = useState(0) //編集対象プレゼントのインデックス
  const [isVisibleRead, setIsVisibleRead] = useState(false); //プレゼント編集モーダル表示フラグ
  const [isVisibleEdit, setIsVisibleEdit] = useState(false); //編集用モーダル表示フラグ
  const [isVisibleImg, setIsVisibleImg] = useState(false); //撮影メニュー表示フラグ
  const [imgIndex, setImgIndex] = useState(0); //撮影した写真の一時保存パラメータ
  const [isSend, setIsSend] = useState(false); //プレゼント送信フラグ

  //プレゼント操作：一覧の取得
  const getPresents = async () => {
    const apiName = 'APIGateway';
    const path = '/dev/presents/list-receive'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
    };
    API.get(apiName, path, reqInfo)
    .then(response => {
      setPresents(JSON.parse(response.body).Items)
    })
    .catch(err => {
      console.log(err);
    });
  }

  //プレゼント関連モーダルの操作
  const readPresent = (item, index:number) => {
    setIsVisibleRead(true);
    setTmpPresent(item);
    setTmpIndex(index);
  }
  const editPresent = (item, index:number) => {
    setIsVisibleEdit(true);
    //フォームに選択されたプレゼントの情報を入力する
    setTmpPresent(item);
    setValue('present_name', tmpPresent['present_name'])
    setValue('present_comment', tmpPresent['present_comment'])
    if(tmpPresent['present_status']['owner'] =='ph00'){
      setIsSend(true);
    } else {
      setIsSend(false);
    }
  }
  //撮影メニューの操作
  const useTakePicture = (index:number) => {
    setImgIndex(index);
    setIsVisibleImg(true);
  }

  //プレゼント操作：更新
  const commitPresents = async (data) => {
    const apiName = 'APIGateway';
    const path = '/dev/presents/commit-own'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
      body: {
        present_id: tmpPresent['present_id'],
        present_name: data.present_name,
        present_status: tmpPresent['present_status'],
        present_images: tmpPresent['present_images'],
        present_comment: data.present_comment,
        user_id_receive: tmpPresent['user_id_receive']
      },
    };
    
    API.post(apiName, path, reqInfo)
    .then(response => {
      console.log(response.body);
      updatePresentList(response);
    })
    .catch(err => {
      console.log(err);
    }); 
  }
  //プレゼント一覧の更新
  const updatePresentList = (response) => {
    let tmplist = presents
    console.log(response)
    //console.log(JSON.parse(response.body).Attributes)
    tmplist.splice(tmpIndex, 1, JSON.parse(response.body).Attributes)
    setPresents(tmplist)
    setIsVisibleEdit(false);
    setIsVisibleRead(false);
  }

  //プレゼント編集フォームの設定
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
  });
  const onSubmit = data => {
    console.log(data);
    commitPresents(data);
    reset();
  };

  //プレゼント使用フラグの操作
  const usePresent = (flag, user_id_receive) => {
    setIsSend(!flag)
    if(isSend){
      tmpPresent['present_status']['owner'] = 'ph01'
    } else if (!isSend){
      tmpPresent['present_status']['owner']  = 'ph00'
    }
    tmpPresent['user_id_receive'] = user_id_receive
  }

  useEffect(() => {
    getPresents()
  }, []);

  if (isVisibleImg) {
    return <PresentCamera imgIndex={imgIndex} setTmpPresent={setTmpPresent} tmpPresent={tmpPresent} updatePresentList={updatePresentList} setIsVisibleImg={setIsVisibleImg}/>;
  } else {
    return (
      <View>
        {
          presents.map((item, i) => (
            //<ListItem key={i} bottomDivider onPress={() => readPresent(item, i)}>
            <ListItem key={i} bottomDivider onPress={() => props.navigate(DETAIL, {present:item})}>
              <Avatar source={{ uri: item['present_images'][0] ? item['present_images'][0] : BASE_URI}} />
              <ListItem.Content>
                <ListItem.Title>{item['present_name']}</ListItem.Title>
                <ListItem.Subtitle>{item['user_id_owner']}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }

        <BottomSheet modalProps={{}} isVisible={isVisibleRead} containerStyle={{height: '100%'}}>
          <Card containerStyle={{ marginTop: 0, marginLeft: 0,width: '100%' }}>
            <Card.Title>
              {tmpPresent['present_name']}
            </Card.Title>
            <Card.Divider />
            <Text style={{ marginBottom: 15}}>利用者: {tmpPresent['user_id_receive']}</Text>
            <Text>コメント: </Text>
            <Text style={{ marginBottom: 15}}>{tmpPresent['present_comment']}</Text>
            <Text style={{ marginBottom: 15}}>作成日: {tmpPresent['date_created']}</Text>
            <View style={styles.imgList}>
              <Image 
                source={{ uri: tmpPresent['present_images'][0] ? tmpPresent['present_images'][0] : BASE_URI}}
                containerStyle={styles.item}
                onPress={() => useTakePicture(0)}
              />
              <Image 
              source={{ uri: tmpPresent['present_images'][1] ? tmpPresent['present_images'][1] : BASE_URI}}
              containerStyle={styles.item}
              onPress={() => useTakePicture(0)}
              />
            </View>
          </Card>
          <Button
            style={styles.button}
            title="編集"
            onPress={() => editPresent(tmpPresent, tmpIndex)}
          />
          <Button
            style={styles.button}
            title="キャンセル"
            onPress={() => setIsVisibleRead(false)}
          />
        </BottomSheet>

        {/*編集メニュー(プレゼント名/コメント/写真)*/}
        <BottomSheet modalProps={{}} isVisible={isVisibleEdit} containerStyle={{height: '100%',backgroundColor: '#ffffff'}}>
          <Card containerStyle={{ marginTop: 0, marginLeft: 0,width: '100%' }}>
            <Card.Title>編集 : {tmpPresent['present_name']}</Card.Title>
          </Card>
          <Text style={styles.label}>プレゼント名</Text>
          <Controller
            control={control}
            rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="present_name"
          />
          {errors.present_name && <Text>必須項目です</Text>}
          
          <Text style={styles.label}>コメント</Text>
          <Controller
            control={control}
            rules={{
            maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="present_comment"
          />

          <CheckBox
            center
            title="プレゼントを使用する"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={!isSend}
            onPress={() => {
              usePresent(isSend, tmpPresent['user_id_receive'])
            }}
          />

          <Text style={styles.label}>送り先（受け取る人） : {tmpPresent['user_id_receive']}</Text>
          <Button title="保存する" onPress={handleSubmit(onSubmit)} />
          <Button
            style={styles.button}
            title="キャンセル"
            onPress={() => setIsVisibleEdit(false)}
          />
        </BottomSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgList: {
    width: 300,
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    //flexWrap: 'wrap',
  },
  item: {
    aspectRatio: 1,
    width: '50%',
  },
  label: {
    //color: 'white',
    backgroundColor: '#ffffff',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  input: {
    backgroundColor: '#ffffff',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

export default ReceiveList