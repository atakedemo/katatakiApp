import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, ListItemProps } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import Header from '../../common/Header';


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
  },
  {
    title: 'アプリ設定'
  }
]

type ListComponentProps = ListItemProps;

const MyPage : React.FunctionComponent<ListComponentProps> = () => {
  return (
    <View style={styles.container}>
      <Header title="アカウント設定"/>
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