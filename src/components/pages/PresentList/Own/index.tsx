import React, { useState, useEffect } from 'react';
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Button, Image } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';
import { View, StyleSheet, Text} from 'react-native';

const BASE_URI = 'https://katataki-prod-images.s3.ap-northeast-1.amazonaws.com/sample_cooking.png';

type ListComponentProps = ListItemProps;

const OwnList : React.FunctionComponent<ListComponentProps> = () => {
  const [presents, setPresents] = useState([]); //プレゼント情報
  const [tmpPresent, setTmpPresent] = useState({}) //編集プレゼント情報
  const [isVisible, setIsVisible] = useState(false); //編集用モーダル表示フラグ

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

  const editPresent = (item: object) => {
    setIsVisible(true);
    setTmpPresent(item);
  }

  useEffect(() => {
    getPresents()
  }, []);

  return (
    <View>
      {
          presents.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={() => editPresent(item)}>
              <Avatar source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} />
              <ListItem.Content>
                <ListItem.Title>{item['present_name']}</ListItem.Title>
                <ListItem.Subtitle>{item['user_id_owner']}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }

        <BottomSheet modalProps={{}} isVisible={isVisible} containerStyle={{height: '100%'}}>
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
          />
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="キャンセル"
            onPress={() => setIsVisible(false)}
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
});

export default OwnList