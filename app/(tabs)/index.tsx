import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import "../globals.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { images } from '@/constants/images';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';

const categories = ['All', 'Popular', 'Action', 'Drama', 'Romance'];

const Index = () => {
  const [selected, setSelected] = useState('All');

  return (
    <View className="flex-1 bg-zinc-900">
      <Image source={images.bg} className="absolute" />
      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo2} className="w-auto h-auto mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar placeholder="Search for a movie" />
          <View className="flex-row justify-center items-center flex-wrap">
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSelected(item)}
                style={[
                  styles.categoryButton,
                  selected === item && styles.selectedCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected === item && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  categoryButton: {
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 20,
    margin: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  selectedCategory: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  categoryText: {
    color: '#999',
    fontSize: 14,
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
});