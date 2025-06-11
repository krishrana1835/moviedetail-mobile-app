import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { fetchActionMovies, searchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    error: movieError,
    loading: movieLoading,
    refetch: loadMovies,
    reset,
  } = useFetch(() => searchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-row justify-center items-center flex-wrap bg-zinc-900 h-full">
      <Image source={images.bg} className="w-full h-full absolute top-0 left-0" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        renderItem={({ item }) => <MovieCard movie={item} />}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 pb-32 flex-1 px-5"
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo2}
              className="w-auto h-auto mt-20 mb-10 mx-auto"
            />

            <SearchBar
              placeholder="Search for a movie"
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />

            {movieLoading && (
              <ActivityIndicator size="large" color="#00f" className="mt-10" />
            )}

            {movieError && (
              <Text className="text-red-500 text-center">
                Error: {movieError}
              </Text>
            )}

            {!movieLoading &&
              !movieError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-white font-bold text-xl m-5">
                  Search for <Text className="text-cyan-400">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className="mt-10 px-5">
              <Text className="text-center" style={{color:"#444"}}>
                {searchQuery.trim() ? "No Data Found" : "Search Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({});
