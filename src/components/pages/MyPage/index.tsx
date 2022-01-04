import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

import getList from '../../apis/present';

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

export default function MyPage() {
  return (
    <View style={styles.container}>
      <Text>マイページ</Text>
      <Button 
        title='テスト'
        onPress={() => getList()}
      />
      <Button 
        title='テスト'
        onPress={() => signOut()}
      />
    </View>
  );
}