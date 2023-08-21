/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
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
    return response;
  } catch (error) {
    console.error(error);
  }
};

const Screen1 = () => {
  // const [page, setPage] = React.useState(1);
  const {
    isError,
    error,
    data: posts,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchAllPosts,
    getNextPageParam: (_lastPage, pages) => {
      return pages.length + 1;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  console.log(posts.pages[0].status);

  if (isError) {
    <Text>{error}</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        contentContainerStyle={{padding: 10}}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        data={posts.pages.map(page => page.data).flat()}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchNextPage();
        }}
        renderItem={({item}) => (
          <View>
            <Text style={{color: 'black', fontSize: 20}}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        ListFooterComponent={
          isFetching && isFetchingNextPage && <ActivityIndicator size="small" />
        }
      />
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
