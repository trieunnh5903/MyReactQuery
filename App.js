import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {setUpServer} from './src/fake_server/mock_api';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Screen2 from './src/screen/Screen2';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Users from './src/screen/Users';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Posts from './src/screen/Posts';
import NewPost from './src/screen/NewPost';
import UserDetail from './src/screen/UserDetail';
import PostDetail from './src/screen/PostDetail';
import NewUser from './src/screen/NewUser';

// staleTime (default 0 ms): Thời gian data được cho là đã cũ. Khi get data xong thì sau một thời gian bạn quy định thì data nó sẽ tự cũ
// cacheTime (default 5*60*1000 ms tức 5 phút): Thời gian data sẽ bị xóa ra khỏi bộ nhớ đệm. Có thể data đã "cũ" nhưng nó chưa bị xóa ra khỏi bộ nhớ đệm vì bạn set stateTime < cacheTime. Thường thì người ta sẽ set stateTime < cacheTime
// inactive: là khi data đó không còn component nào subcribe cả

// isLoading or status === 'loading' - Query chưa có data
// isError or status === 'error' - Query xảy ra lỗi
// isSuccess or status === 'success' - Query thành công và data đã có sẵn

// error - Nếu isError === true thì error sẽ xuất hiện ở đây
// data - Nếu isSuccess === true thì data sẽ xuất hiện ở đây

// isFetching or fetchStatus === 'fetching' - Đang fetching API.
// isPaused or fetchStatus === 'paused' - Query muốn fetch API nhưng bị tạm dừng vì một lý do nào đó.
// fetchStatus === 'idle' - Query không làm gì cả

// status cho thông tin data có hay không
// fetchStatus cho thông tin về queryFn có đang chạy hay không
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
          <Stack.Screen name="New User" component={NewUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
