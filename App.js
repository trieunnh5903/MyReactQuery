import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {setUpServer} from './src/fake_server/mock_api';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Screen2 from './src/screen/Screen2';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Users from './src/screen/Users';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Posts from './src/screen/Posts';
import NewPost from './src/screen/NewPost';
import UserDetail from './src/screen/UserDetail';
import PostDetail from './src/screen/PostDetail';

// if (window.server) {
//   window.server.shutdown();
// }

// window.server = setUpServer();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const RootStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="NewPost" component={NewPost} />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="RootStack"
            component={RootStack}
            options={{headerShown: false}}
          />
          <Stack.Screen name="User Detail" component={UserDetail} />
          <Stack.Screen name="Post Detail" component={PostDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
