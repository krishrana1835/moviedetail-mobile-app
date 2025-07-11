import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import search from "../(tabs)/search";
import { fetchMovieDetails, fetchMovieTrailers } from "@/services/api";
import { icons } from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import { navigate } from "expo-router/build/global-state/routing";
import { AppContext } from "../context/AppContext";

interface Props {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: Props) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="font-normal text-sm" style={{ color: "#777" }}>
        {label}
      </Text>
      <Text className="font-bold text-sm mt-2" style={{ color: "#999" }}>
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const context = useContext(AppContext);

  if (!context)
    throw new Error("AppContext must be used within an AppProvider");

  const { email, addItem, removeItem, isSaved } = context;

  const { data: movie, loading } = useFetch(
    () => fetchMovieDetails(id.toString()),
    true
  );

  const { data: movieTrailers } = useFetch(
    () => fetchMovieTrailers(id.toString()),
    true
  );

  const trailer = movieTrailers?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );

  const handleSave = () => {
    if (email.trim()) {
      if (isSaved(id.toString())) {
        removeItem(id.toString());
      } else {
        addItem(id.toString());
      }
    } else {
      Alert.alert("Login", "Please Login.");
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#070529" }}>
      <Image source={images.bg} className="absolute w-full h-full" />
      {movie && (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          <View>
            <Image
              source={{
                uri: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `http://placehold.co/400x400/1a1a1a/ffffff.png`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie.title}</Text>
            <View className="flex-row items-start">
              <Text className="text-sm" style={{ color: "#777" }}>
                {movie.release_date?.split("-")[0]}
              </Text>
              <Text className="text-sm ml-5" style={{ color: "#777" }}>
                {movie?.runtime}m
              </Text>
            </View>
            <View className="flex-row items-center justify-start gap-x-1 bg-slate-700 p-1 rounded-md mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-xs text-white font-bold uppercase">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-sm" style={{ color: "#777" }}>
                ({movie.vote_count} people)
              </Text>
            </View>

            <View className="flex flex-row justify-center items-center w-full">
              <TouchableOpacity
                className={`${
                  trailer ? "w-[50%]" : "w-full"
                } mt-5 mr-2 bg-blue-950 rounded-lg py-3.5 flex flex-row items-center justify-center`}
                onPress={handleSave}
              >
                <Image source={isSaved(id.toString()) ? icons.saved : icons.save} className="size-5 mr-3" />
                <Text className="text-white font-bold opacity-100">{isSaved(id.toString())?"Saved" : "Save"}</Text>
              </TouchableOpacity>

              {trailer && (
                <TouchableOpacity
                  className="w-[50%] mr-2 mt-5 bg-blue-950 rounded-lg py-3.5 flex flex-row items-center justify-center"
                  onPress={() =>
                    Linking.openURL(
                      `https://www.youtube.com/watch?v=${trailer.key}`
                    )
                  }
                >
                  <Image source={icons.trailer} className="size-5 mr-3" />
                  <Text className="text-white font-bold opacity-100">
                    Watch Trailer
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <MovieInfo label="Overview" value={movie.overview} />
            <MovieInfo
              label="Genres"
              value={movie.genres.map((g) => g.name).join("-") || "N/A"}
            />
            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$${movie.budget / 1_000_000} milion`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${movie.revenue / 1_000_000} milion`}
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={
                movie.production_companies.map((c) => c.name).join("-") || "N/A"
              }
            />
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-blue-900 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
