import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import "../globals.css";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import {
  fetchActionMovies,
  fetchDramaMovies,
  fetchLatestMovies,
  fetchPopularMovies,
  fetchRomanceMovies,
  loadTrending,
  searchMovies, // you can add fetchLatestMovies etc.
} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { SafeAreaView } from "react-native-safe-area-context";

// tabs
const categories = ["Latest", "Popular", "Action", "Drama", "Romance"];

// Category Tabs component
const Categories = ({ selected, setSelected }: any) => {
  return (
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
  );
};

const Index = () => {
  const [selected, setSelected] = useState("Latest");

  // Return appropriate fetch function
  const getFetchFunction = useCallback(() => {
    switch (selected) {
      case "Popular":
        return fetchPopularMovies;
      case "Latest":
        return fetchLatestMovies;
      case "Action":
        return fetchActionMovies;
      case "Drama":
        return fetchDramaMovies;
      case "Romance":
        return fetchRomanceMovies;
      default:
        return fetchPopularMovies;
    }
  }, [selected]);

  const {
    data: trendngMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(loadTrending, true);

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
    refetch,
  } = useFetch(getFetchFunction(), true);

  useEffect(() => {
    refetch();
  }, [selected]);

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <Image source={images.bg} className="absolute w-full h-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Image
          source={icons.logo2}
          className="w-auto h-auto mt-20 mb-5 mx-auto"
        />

        {movieLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#00f" className="mt-10" />
        ) : movieError || trendingError ? (
          <Text className="text-red-500 text-center">
            Error: {movieError || trendingError}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar placeholder="Search for a movie" value="" />

            {trendngMovies && (
              <View className="mt-10">
                <Text className="text-white font-bold text-lg mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendngMovies}
                  keyExtractor={(items) => items.id?.toString()}
                  renderItem={({item, index}) => <TrendingCard movie={item} index={index} />}
                  horizontal
                  className="mb-4 mt-3"
                  ItemSeparatorComponent={() => <View className="w-4"/>}
                />
              </View>
            )}

            <Categories selected={selected} setSelected={setSelected} />

            <Text className="text-white font-bold text-lg m-5">
              {selected} Movies
            </Text>

            <FlatList
              data={movies}
              keyExtractor={(item) => item.id?.toString()}
              scrollEnabled={false}
              numColumns={3}
              renderItem={({ item }) => <MovieCard movie={item} />}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  categoryButton: {
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 20,
    margin: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  selectedCategory: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  categoryText: {
    color: "#999",
    fontSize: 14,
  },
  selectedText: {
    color: "#000",
    fontWeight: "bold",
  },
});
