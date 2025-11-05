import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import AddressInfoScreen from '../screens/AddressInfoScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1b1d21ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Profile App', animation: 'none' }}
        />
        <Stack.Screen
          name="BasicInfo"
          component={BasicInfoScreen}
          options={{ title: 'Basic Info', animation: 'none' }}
        />
        <Stack.Screen
          name="AddressInfo"
          component={AddressInfoScreen}
          options={{ title: 'Address Info', animation: 'none' }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ animation: 'none' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
