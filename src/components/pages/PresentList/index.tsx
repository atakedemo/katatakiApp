//import React, { useState  }  from 'react';
import React, { useState  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tab, TabView } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//const [index, setIndex] = useState(0);

/*
export default class PresentList extends Component{
  click(){
    alert('XXXSX');
  }
  render() {
*/

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
          title="Recent"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="favorite"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="cart"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      <TabView value={index-1} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
          <Text>Recent</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <Text>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
}