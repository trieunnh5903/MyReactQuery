/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchPostById = async postId => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchCommentsByPostId = async postId => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    return response.data;
  } catch (error) {
    // cần xử lý error để có thể trả dữ liệu về error và isError
    return Promise.reject(error);
  }
};

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

const PostDetail = ({route, navigation}) => {
  const {postId} = route.params;
  //lay chi tiet bai viet
  const {
    data: post,
    isError: isPostError,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ['getPost', postId],
    queryFn: () => fetchPostById(postId),
  });

  //lay ten tac gia bai viet
  const userId = post?.userId;
  const {data: user} = useQuery({
    queryKey: ['getUser', userId],
    queryFn: () => fetchUserById(userId),
    // khi co userId thi moi kich hoat query
    enabled: !!userId,
  });

  // lay danh sach binh luan bai viet
  const {data: comments} = useQuery({
    queryKey: ['getCommentsByPostId', postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  if (isPostLoading) {
    return <Text>Loading...</Text>;
  }

  if (isPostError) {
    return <Text>{postError.message}</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
      <Text>Author: {user?.name}</Text>
      <Text style={{color: 'black', fontSize: 20}}>{post?.title}</Text>
      <Text>{post?.body}</Text>
      <View
        style={{
          borderWidth: 1,
          flexDirection: 'row',
          padding: 10,
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
      <View>
        {comments?.map(item => {
          return (
            <View key={item.id} style={{marginVertical: 5}}>
              <Text style={{color: 'black'}}>{item.email}</Text>
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({});
