import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DETAIL } from '../../../constants/screen';
import { Card, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Home() {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>最近もらったプレゼント</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri:'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
          }}
        />
        <Text style={{ marginBottom: 10 }}>
          プレゼントに関するコメントを記載する
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="詳細を見る"
          onPress={() => navigate(DETAIL)}
        />
      </Card>
      <TouchableOpacity onPress={() => navigate(DETAIL)}>
        <Text>詳細画面へ遷移する</Text>
      </TouchableOpacity>
    </View>
  );
}