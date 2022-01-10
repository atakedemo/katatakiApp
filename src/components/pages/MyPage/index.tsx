import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, ListItemProps } from 'react-native-elements';
import { Auth } from 'aws-amplify';

<<<<<<< HEAD
import getPresents from '../../apis/present';
=======
import getList from '../../apis/present';
>>>>>>> 234f3c6f5883279b58f788674f35d7c7a87542ac

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const menuList = [
  {
    title: 'サインアウト',
    onPress: () => signOut()
  },
  {
    title: 'アカウント情報変更',
<<<<<<< HEAD
    onPress: () => getPresents()
  },
  {
    title: '設定',
    onPress: () => getPresents()
=======
    onPress: () => getList()
  },
  {
    title: '設定',
    onPress: () => getList()
>>>>>>> 234f3c6f5883279b58f788674f35d7c7a87542ac
  }
]

type ListComponentProps = ListItemProps;

const MyPage : React.FunctionComponent<ListComponentProps> = () => {
  return (
    <View style={styles.container}>
      {
        menuList.map((item, i) => (
          <ListItem 
            key={i} 
            bottomDivider
            onPress={item.onPress}
            style={{ backgroundColor: 'white', width: '100%' }}
          >
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </View>
  );
}

export default MyPage