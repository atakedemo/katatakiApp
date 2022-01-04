import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, ListItemProps, Avatar, BottomSheet, Card, Button } from 'react-native-elements'
//import { useNavigation } from '@react-navigation/native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';

//import { DETAIL } from '../../../../constants/screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const list = [
  {
    name: 'Item01',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    title: 'Vice President',
    subtitle: 'Subtitle'
  },
  {
    name: 'Item02',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    title: 'Vice Chairman',
    subtitle: 'Subtitle'
  },
  {
    name: 'Item03',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    title: 'Vice Chairman',
    subtitle: 'Subtitle',
  },
  {
    name: 'Item03',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    title: 'Vice Chairman',
    subtitle: 'Subtitle',
  },
]


type ListComponentProps = ListItemProps;

const ReceiveList  : React.FunctionComponent<ListComponentProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bottomlist = [
    { title: 'List Item 1' },
    { title: 'List Item 2' },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    //ToDo: ルート設定を行った後で、詳細画面への遷移処理を追加する
    //ToDo: 編集画面をBottomSheetで実装する
    <View>
        {
          list.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={() => setIsVisible(true)}>
              <Avatar source={{uri: item.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          <Card containerStyle={{ marginTop: 15 }}>
            <Card.Title>FONTS</Card.Title>
            <Card.Divider />
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
            <Text>h1 Heading</Text>
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

export default ReceiveList