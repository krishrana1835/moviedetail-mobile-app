import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../context/AppContext";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { getMovieDetails, searchMovies } from "@/services/api";

const saved = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("AppContext must be used within an AppProvider");

  const { saved, email } = context;

  const [savedMovies, setSavedMovies] = useState<any[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const results = await Promise.all(saved.map((id) => getMovieDetails(id)));
      setSavedMovies(results.filter(Boolean));
    };

    if (saved.length > 0) {
      loadMovies();
    } else {
      setSavedMovies([]);
    }
  }, [saved]);

  return (
    <SafeAreaView className="flex-1 bg-[#070529]">
      <Image source={images.bg} className="absolute w-full h-full" />
      {!email.trim() ? (
        <View className="flex-1 items-center justify-center px-6">
          <View
            className="w-full max-w-md bg-white/10 p-6 rounded-xl"
            style={{ zIndex: 1 }}
          >
            <Text className="text-white text-2xl font-semibold text-center">
              Please Login
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex-1 mt-5 m-5">
          <Text className="text-white font-bold text-lg mb-3">
            Saved Movies
          </Text>

          <FlatList
            data={savedMovies}
            keyExtractor={(item) => item.id.toString()}
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
    </SafeAreaView>
  );
};

export default saved;

const styles = StyleSheet.create({});
