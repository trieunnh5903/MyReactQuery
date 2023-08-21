/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const fetchUserById = async userId => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const UserDetail = ({route, navigation}) => {
  const {id: userId} = route.params;
  const queryClient = useQueryClient();
  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['getUser', userId],
    queryFn: () => fetchUserById(userId),
    initialData: () => {
      return queryClient.getQueriesData(['users'])?.find(u => u.id === userId);
    },
    initialDataUpdatedAt: () => {
      queryClient.getQueryState(['users'])?.dataUpdatedAt;
    },
  });

  if (isUserLoading) {
    return <Text>Loading...</Text>;
  }

  if (isUserError) {
    return <Text>{userError.message}</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 10}}>
        <Text style={{color: 'black', fontSize: 20}}>User Information</Text>
        <Text>Name: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>
          Address: {user?.address?.street}, {user?.address?.suite},
          {user?.address?.city}
        </Text>
        <Text>Phone: {user?.phone}</Text>
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});
