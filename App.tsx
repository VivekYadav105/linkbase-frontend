/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/homeScreen';
import UrlScreen from './src/screens/urlScreen';
import SharedScreen from './src/screens/shareScreen';
import UserProvider from './src/context/userContext';
import { NativeWindStyleSheet } from 'nativewind';

const Stack = createNativeStackNavigator();


function App(): JSX.Element {

  NativeWindStyleSheet.setOutput({
    default: 'native',
  });

  return (
    <UserProvider>
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
                <Stack.Screen name="Url" component={UrlScreen}/>
                <Stack.Screen name="Shared" component={SharedScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
    </UserProvider>
    // <NavBar></NavBar>

  );
}

export default App;
