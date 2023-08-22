/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

const NewUser = ({navigation}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const canSubmit = Boolean(name && userName && phone && email && address);
  const queryClient = useQueryClient();
  const {mutate, isSuccess, isError, error} = useMutation({
    mutationFn: user => {
      return axios.post(
        'https://64e38bc4bac46e480e78efbf.mockapi.io/users',
        user,
      );
    },
    // onSuccess: response => {
    //   // sau khi post co the invalidate query de co the fetch lai users cap nhat lai danh sach user
    //   // queryClient.invalidateQueries({queryKey: ['users']});
    //   // hoac co the lay du lieu tra ve tu post set vao cache
    //   queryClient.setQueryData(['users'], oldData => {
    //     return oldData ? [...oldData, response.data] : oldData;
    //   });
    // },

    // optimistic-update: set user vao cache truoc khi call api, neu post gap loi se rollback lai du lieu cu
    onMutate: async user => {
      await queryClient.cancelQueries({queryKey: ['users']});
      const previousUsers = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], oldData => {
        return oldData
          ? [...oldData, {...user, id: oldData?.length + 1}]
          : oldData;
      });
      return {previousUsers};
    },

    onSuccess: () => {
      ToastAndroid.show('Success', ToastAndroid.SHORT);
      console.log('success');
      navigation.goBack();
    },

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['users'], context.previousUsers);
    },

    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
    },
  });
  const handlerSubmit = () => {
    if (canSubmit) {
      mutate({name, userName, email, address, phone});
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={{borderWidth: 1, margin: 10, borderRadius: 10}}
      />

      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Username"
        style={{borderWidth: 1, margin: 10, borderRadius: 10}}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={{borderWidth: 1, margin: 10, borderRadius: 10}}
      />

      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={{borderWidth: 1, margin: 10, borderRadius: 10}}
      />

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        style={{borderWidth: 1, margin: 10, borderRadius: 10}}
      />

      <TouchableOpacity
        onPress={() => handlerSubmit()}
        style={styles.btnSubmit}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  btnSubmit: {
    height: 50,
    margin: 10,
    backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
