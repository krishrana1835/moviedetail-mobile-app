import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  if (!movie) return null;

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `http://placehold.co/400x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {movie.title ?? 'Untitled'}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">{Math.round(movie.vote_average)}</Text>
        </View>
        <Text className="text-xs font-medium justify-end" style={{ color: '#777' }}>
          {movie.release_date?.split('-')[0] ?? 'N/A'}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;