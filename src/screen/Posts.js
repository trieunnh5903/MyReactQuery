/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchAllPosts = async ({pageParam = 1}) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(new Error(error.message || error));
  }
};

const Posts = ({navigation}) => {
  const {
    isLoading,
    isError,
    error,
    data: posts,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchAllPosts,
    getNextPageParam: (_lastPage, pages) => {
      return pages.length + 1;
    },
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 10}}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        data={posts.pages.flat()}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchNextPage();
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Post Detail', {postId: item.id})
            }>
            <Text style={{color: 'black', fontSize: 16}}>{item.title}</Text>
            <Text>{item.body}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          isFetching && isFetchingNextPage && <ActivityIndicator size="small" />
        }
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({});
