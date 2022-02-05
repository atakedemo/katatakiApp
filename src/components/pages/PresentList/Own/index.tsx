import React, { useState, useEffect } from 'react';
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Button, Image } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';
import { View, StyleSheet, Text, TextInput} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { number } from 'yup';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const BASE_URI = 'https://katataki-prod-images.s3.ap-northeast-1.amazonaws.com/sample_cooking.png';

type ListComponentProps = ListItemProps;

const OwnList : React.FunctionComponent<ListComponentProps> = () => {
  const [presents, setPresents] = useState([]); //プレゼント情報
  const [tmpPresent, setTmpPresent] = useState({}) //編集プレゼント情報
  const [tmpIndex, setTmpIndex] = useState(0) //編集プレゼント情報
  const [isVisibleRead, setIsVisibleRead] = useState(false); //プレゼント編集モーダル表示フラグ
  const [isVisibleEdit, setIsVisibleEdit] = useState(false); //編集用モーダル表示フラグ

  const getPresents = async () => {
    const apiName = 'APIGateway';
    const path = '/dev/presents/list-own'; 
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

  //ToDo：インデックス情報を渡す
  const readPresent = (item: object, index:number) => {
    setIsVisibleRead(true);
    setTmpPresent(item);
    setTmpIndex(index);
  }

  const editPresent = (item: object, index:number) => {
    setIsVisibleEdit(true);
    setTmpPresent(item);
  }

  //プレゼント編集フォームの設定
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => {
    console.log(data);
    commitPresents();
  };

  //ToDo: プレゼント編集結果保存処理
  //ToDo：レスポンス(単一の情報を差し込む)
  const commitPresents = async () => {
    const apiName = 'APIGateway';
    const path = '/dev/presents/commit-own'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
      body: {
        present_id: "p99",
        present_name: "testRN",
        present_status: {
          owner: "送付前",
          reciever: "-",
          id: "ph01"
        },
        present_images: [],
        user_id_receive: "000"
      },
    };
    
    API.post(apiName, path, reqInfo)
    .then(response => {
      console.log(response.body)
      let tmplist:object = presents
      //tmplist[tmpIndex] = JSON.parse(response.body)
      console.log(tmplist)
      //setPresents(JSON.parse(response.body).Items)
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  useEffect(() => {
    getPresents()
  }, []);

  return (
    <View>
      {
          presents.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={() => readPresent(item, i)}>
              <Avatar source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} />
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
            <Card.Title>{tmpPresent['present_name']}</Card.Title>
            <Card.Divider />
            <Text>利用者: {tmpPresent['user_id_receive']}</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text style={{ marginBottom: 15}}>作成日: {tmpPresent['date_created']}</Text>
            <View style={styles.imgList}>
              <Image
                source={{ uri: BASE_URI}}
                containerStyle={styles.item}
              />
              <Image
                source={{ uri: BASE_URI}}
                containerStyle={styles.item}
              />
            </View>
            <View style={styles.imgList}>
              <Image
                source={{ uri: BASE_URI}}
                containerStyle={styles.item}
              />
              <Image
                source={{ uri: BASE_URI}}
                containerStyle={styles.item}
              />
            </View>
          </Card>
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="編集"
            onPress={() => editPresent(tmpPresent, tmpIndex)}
          />
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="キャンセル"
            onPress={() => setIsVisibleRead(false)}
          />
        </BottomSheet>
        <BottomSheet modalProps={{}} isVisible={isVisibleEdit} containerStyle={{height: '100%'}}>
          <Card containerStyle={{ marginTop: 0, marginLeft: 0,width: '100%' }}>
            <Card.Title>編集 : {tmpPresent['present_name']}</Card.Title>
            <Text>h1 Heading</Text>
          </Card>
          {/*ToDo01 BottomSheetを二重にできるか確認→完了*/}
          {/*ToDo02 フォームを設けられるか確認*/}
          <Text style={styles.label}>First name</Text>
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
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
          
          <Text style={styles.label}>Last name</Text>
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
            name="lastName"
          />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />

          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="キャンセル"
            onPress={() => setIsVisibleEdit(false)}
          />
        </BottomSheet>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  input: {
    backgroundColor: 'white',
    //borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

export default OwnList