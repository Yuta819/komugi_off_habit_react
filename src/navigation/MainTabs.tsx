import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { CheckInScreen } from '../screens/CheckInScreen';
import { ReflectionScreen } from '../screens/ReflectionScreen';
import { SupporterScreen } from '../screens/SupporterScreen';
import { JudgeScreen } from '../screens/JudgeScreen';
import { AppBuilderScreen } from '../screens/AppBuilderScreen';
import { colors } from '../theme/colors';

export type MainTabParamList = {
  Home: undefined;
  CheckIn: undefined;
  Reflection: undefined;
  Judge: undefined;
  Supporter: undefined;
  Builder: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.peachDeep,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: 62,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム' }} />
      <Tab.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'チェックイン' }} />
      <Tab.Screen name="Reflection" component={ReflectionScreen} options={{ title: 'ふりかえり' }} />
      <Tab.Screen name="Judge" component={JudgeScreen} options={{ title: 'たぶんOK' }} />
      <Tab.Screen name="Supporter" component={SupporterScreen} options={{ title: '応援' }} />
      <Tab.Screen name="Builder" component={AppBuilderScreen} options={{ title: '作成' }} />
    </Tab.Navigator>
  );
};
