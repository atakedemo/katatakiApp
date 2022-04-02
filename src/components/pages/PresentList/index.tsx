//import React, { useState  }  from 'react';
import React, { useState  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import Header from '../../common/Header';

import OwnList from './Own';
import ReceiveList from './Receive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PresentList() {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Header title="プレゼント一覧"/>
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
          //icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="あげるプレゼント"
          titleStyle={{ fontSize: 12 }}
          //icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="トロフィー"
          titleStyle={{ fontSize: 12 }}
          //icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      <TabView value={index-1} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <ReceiveList />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <OwnList />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
}