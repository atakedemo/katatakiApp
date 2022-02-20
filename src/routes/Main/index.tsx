import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HOME, MY_PAGE, FOLLOW_LIST, PRESENT_LIST, NEWPRESENT } from '../../constants/screen';
import { MyPage , FollowList, PresentList, NewPresent} from '../../components/pages';
import { COLOR } from '../../constants/theme';
import Home from './Home';

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      activeColor={COLOR.TAB_ACTIVE}
      shifting={true}
    >
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarColor: COLOR.BOTTOM_TAB,
          tabBarLabel: 'ホーム',
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={PRESENT_LIST}
        component={PresentList}
        options={{
          tabBarColor: COLOR.BOTTOM_TAB,
          tabBarLabel: 'プレゼント',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="gift-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NEWPRESENT}
        component={NewPresent}
        options={{
          tabBarColor: COLOR.BOTTOM_TAB,
          tabBarLabel: '新規作成',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={FOLLOW_LIST}
        component={FollowList}
        options={{
          tabBarColor: COLOR.BOTTOM_TAB,
          tabBarLabel: 'フォロワー',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box-multiple-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={MY_PAGE}
        component={MyPage}
        options={{
          tabBarColor: COLOR.BOTTOM_TAB,
          tabBarLabel: 'ユーザー設定',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}