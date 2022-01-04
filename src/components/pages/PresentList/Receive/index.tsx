import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, ListItemProps, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

import { DETAIL } from '../../../../constants/screen';

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
    subtitle: 'Subtitle'
  },
]

type ListComponentProps = ListItemProps;

//export default function ReceiveList() {
const ReceiveList  : React.FunctionComponent<ListComponentProps> = () => {
  const { navigate } = useNavigation();
  return (
    //ToDo: ルート設定を行った後で、詳細画面への遷移処理を追加する
    //ToDo: 編集画面をBottomSheetで実装する
    <View>
      {
        list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => navigate(DETAIL)}>
            <Avatar source={{uri: item.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </View>
  );
}

export default ReceiveList