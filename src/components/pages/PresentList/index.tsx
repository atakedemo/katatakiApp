import React, { Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/*
export default function MyPage() {
  return (
    <View style={styles.container}>
      <Text>プレゼント一覧</Text>
    </View>
  );
}*/

export default class MyPage extends Component{
  click(){
    alert('XXX');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>プレゼント一覧</Text>
        <Button 
          large
          backgroundColor='#53DCD0'
          icon={{name: 'android'}}// nameにアイコン名を指定
          title='Weeei Button!'
          onPress={this.click}
        />
        <Divider style={{ backgroundColor: 'blue' }} />
      </View>
    );
  }
}