import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationsScreen from './Locations';
import Styles from './Styles';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="OrderListScreen"  >
        <Stack.Screen name="Locations" component={LocationsScreen}
          options={{
            title: 'LOCATIONS',
            headerTitleStyle: Styles.headerTitleStyle
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
