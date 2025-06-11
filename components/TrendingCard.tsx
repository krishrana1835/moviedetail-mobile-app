import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view"
import {images} from "@/constants/images" 

const TrendingCard = ({ movie, index }: any) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-32 pl-5 relative">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `http://placehold.co/400x400/1a1a1a/ffffff.png`,
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 -left-0.5 px-2 py-1 rounded-4">
          <MaskedView maskElement={
            <Text className="font-bold text-white text-6xl">{index+1}</Text>   
          }>
            <Image source={images.rankingGradient} className="size-14" resizeMode="cover"/>
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
