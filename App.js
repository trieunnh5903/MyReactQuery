import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {setUpServer} from './src/fake_server/mock_api';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Screen1 from './src/screen/Screen1';
import Screen2 from './src/screen/Screen2';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// if (window.server) {
//   window.server.shutdown();
// }

// window.server = setUpServer();
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen name="Infinity Scroll" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
