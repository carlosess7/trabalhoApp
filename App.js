import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import List from './screens/List';
import UserForm from './screens/UserForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: '', headerLeft: null }}/>
        <Stack.Screen name="List" component={List} options={{ title: '', headerLeft: null }} />
        <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Back' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
