import { StyleSheet, TextInput, View, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { useRouter } from 'expo-router';

const SearchBar = ({placeholder, onPress, value, onChangeText}: any) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="white"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        className="flex-1 ml-2 text-white rounded-full border border-gray-400 pl-5"
        onFocus={() => router.push('/search')}
      />
    </View>
  );
};

export default SearchBar;
