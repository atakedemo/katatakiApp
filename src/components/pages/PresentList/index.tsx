//import React, { useState  }  from 'react';
import React, { useState  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tab, TabView } from 'react-native-elements'

//import OwnList from './Own';
import ReceiveList from './Receive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
/*
const routes = [
  { key: 'tab1', title: 'タブ1' },
  { key: 'tab2', title: 'タブ2' }
];*/

export default function PresentList() {
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
          //icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="あげたプレゼント"
          titleStyle={{ fontSize: 12 }}
          //icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="cart"
          titleStyle={{ fontSize: 12 }}
          //icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      <TabView value={index-1} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <ReceiveList />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
}