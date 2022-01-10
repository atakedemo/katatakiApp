import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Button } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';

//import getPresents from '../../../apis/present';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
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

        <BottomSheet modalProps={{}} isVisible={isVisible}>
          <Card containerStyle={{ marginTop: 15 }}>
            <Card.Title>{tmpPresent['present_name']}</Card.Title>
            <Card.Divider />
            <Text>利用者: {tmpPresent['user_id_receive']}</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text>作成日: {tmpPresent['date_created']}</Text>
          </Card>
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

export default OwnList