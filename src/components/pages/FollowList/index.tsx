import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MyPage() {
  return (
    <View style={styles.container}>
      <Text>フォロー一覧(近日実装予定)</Text>
    </View>
  );
}