/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getAllUsers = async () => {
  try {
    const response = await axios.get(
      'https://64e38bc4bac46e480e78efbf.mockapi.io/users',
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const Users = ({navigation}) => {
  //nut them moi
  const headerRight = useCallback(
    () => (
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => navigation.navigate('New User')}>
        <Text style={{color: 'red'}}>Add</Text>
      </TouchableOpacity>
    ),
    [navigation],
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [headerRight, navigation]);
  //ket thuc nut them moi

  //lay danh sach nguoi dung
  const {data, isFetching, isError, error, isLoading} = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        contentContainerStyle={{padding: 10}}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('User Detail', {id: item.id})}>
            <Text style={{color: 'black', fontSize: 20}}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>Detail &gt;</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={isFetching && <ActivityIndicator size="small" />}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
