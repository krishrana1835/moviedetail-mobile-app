import { AppContext } from "@/app/context/AppContext";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React, { useContext } from "react";
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  if (!movie) return null;

  const context = useContext(AppContext)

  if(!context) throw new Error('AppContext must be used within an AppProvider');

  const {email, addItem, removeItem, isSaved} = context

  const handleSave = () => {
    if(email.trim()){
      if(isSaved(movie.id.toString())){
      removeItem(movie.id.toString())
    }else{
      addItem(movie.id.toString())
    }
    }else{
      Alert.alert('Login', 'Please Login.')
    }
  }

  return (
    <View className="w-[30%] relative">
      {/* Save Icon */}
      <TouchableOpacity className="absolute top-1 right-1 z-50 bg-zinc-900 rounded-full p-1 opacity-50" onPress={handleSave}>
        <Image source={isSaved(movie.id.toString()) ? icons.saved : icons.save} className="w-5 h-5" />
      </TouchableOpacity>

      {/* Card Content Link */}
      <Link href={`/movies/${movie.id}`} asChild>
        <TouchableOpacity className="pb-2">
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
          <View className="flex-row items-center space-x-1 mt-1">
            <Image source={icons.star} className="w-4 h-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(movie.vote_average)}
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-400">
            {movie.release_date?.split('-')[0] ?? 'N/A'}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;