import { useNavigation } from '@react-navigation/native';
import { DETAIL } from '../../../constants/screen';
import { Card, Button } from 'react-native-elements';
import React, { useState  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tab, TabView } from 'react-native-elements';

import OwnList from '../PresentList/Own';
import ReceiveList from '../PresentList/Receive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Home() {
  const { navigate } = useNavigation();
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="もらったプレゼント"
          titleStyle={{ fontSize: 12 }}
        />
        <Tab.Item
          title="あげるプレゼント"
          titleStyle={{ fontSize: 12 }}
        />
        <Tab.Item
          title="トロフィー"
          titleStyle={{ fontSize: 12 }}
        />
      </Tab>

      <TabView value={index-1} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <ReceiveList navigate={navigate} />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <OwnList />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView>

    {/*}
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
      */}
    </View>
  );
}