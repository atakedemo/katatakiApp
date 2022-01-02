import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, ListItemProps, } from 'react-native-elements'

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
    title: 'Vice President'
  },
  {
    name: 'Item02',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    title: 'Vice Chairman'
  },
  {
    name: 'Item03',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    title: 'Vice Chairman'
  },
]

type ListComponentProps = ListItemProps;

//export default function ReceiveList() {
const ReceiveList  : React.FunctionComponent<ListComponentProps> = () => {
  return (
    /*
    <View style={styles.container}>
      <Text>もらったプレゼント</Text>
    </View>
    */
    <View>
      {
        list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  );
}

export default ReceiveList