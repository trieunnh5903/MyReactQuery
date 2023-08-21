import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Screen2 = () => {
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10',
      );
      const data = await res.json();
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <View>
      <Text>Screen2</Text>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({});
