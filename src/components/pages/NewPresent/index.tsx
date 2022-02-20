import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert  } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Image, CheckBox } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';

type ListComponentProps = ListItemProps;

const NewPresent : React.FunctionComponent<ListComponentProps> = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      present_name: '',
      present_comment: ''
    }
  });
  const onSubmit = data => {
    console.log(data);
    createPresent(data);
  };

  const [follows, setFollows] = useState([]); //フォロー一覧
  const [tmpPresent, setTmpPresent] = useState({
    present_id: 'XX01',
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
  const [isVisibleSend, setIsVisibleSend] = useState(false); //送信先選択モーダル表示フラグ

  //フォロー操作：一覧の取得
  const getFollows = async () => {
    const apiName = 'APIGateway';
    const path = '/dev/follow/list-follow'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
    };
    API.get(apiName, path, reqInfo)
    .then(response => {
      setFollows(JSON.parse(response.body).Items)
    })
    .catch(err => {
      console.log(err);
    });
  }

  //プレゼント操作：更新
  const createPresent = async (data) => {
    const apiName = 'APIGateway';
    const path = '/dev/presents/create-own'; 
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
      console.log(response.body)
      Alert.alert(
        '成功', 
        'プレゼントが作成されました',
      [{text: 'OK', onPress: () => console.log('アラートのOKをタップした時の挙動を書く')},]);
    })
    .catch(err => {
      console.log(err);
    }); 
  }

  //プレゼント使用フラグの操作
  const usePresent = (flag, user_id_receive) => {
    tmpPresent['present_status']['owner']  = 'ph00'
    tmpPresent['user_id_receive'] = user_id_receive
  }

  useEffect(() => {
    getFollows()
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.label}>プレゼント名</Text>
    <Controller
      control={control}
      rules={{
       required: true,
      }}
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
    <Button title="作成する" onPress={handleSubmit(onSubmit)} />

    {/*送信先の選択リスト*/}
    <BottomSheet modalProps={{}} isVisible={isVisibleSend}>
      {
        follows.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => {
            usePresent(false, item['user_id'])
            //createPresent(tmpPresent);
            setIsVisibleSend(false);
          }}>
            <Avatar source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} />
            <ListItem.Content>
              <ListItem.Title>{item['user_name']}</ListItem.Title>
              <ListItem.Subtitle>{item['user_category']}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      <Button
        //style={styles.button}
        title="キャンセル"
        onPress={() => setIsVisibleSend(false)}
      />
    </BottomSheet>
  </View>
  );
}

const styles = StyleSheet.create({
  /*
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  */
  imgList: {
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
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

export default NewPresent;