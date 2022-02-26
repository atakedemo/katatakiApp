import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, HOME, PRESENT_LIST, NEWPRESENT } from '../../constants/screen';
import { Detail, Home, PresentList, NewPresent } from '../../components/pages';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName={HOME}>
      <Stack.Screen
        name={HOME}
        component={Home}
        options={{
          title: 'ホーム',
        }}
      />
      <Stack.Screen
        name={DETAIL}
        component={Detail}
        options={{
          title: '詳細画面',
        }}
      />
      <Stack.Screen
        name={PRESENT_LIST}
        component={PresentList}
        options={{
          title: 'プレゼント一覧',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;