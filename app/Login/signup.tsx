import { images } from "@/constants/images";
import { addUser } from "@/services/api";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SignUpProps = {
  setSignup: (val: boolean) => void;
};

const SignUp = ({ setSignup }: SignUpProps) => {
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {

    if(!Name.trim()){
      Alert.alert('Require', 'Name is required')
      return
    }
    if(!Age.trim()){
      Alert.alert('Require', 'Age is required')
      return
    }
    if(!Email.trim()){
      Alert.alert('Require', 'Email is required')
      return
    }

    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match.");
      setConfirm("");
      return;
    }

    if(password.length < 6) {
      Alert.alert('Require','Password should be more than 6 chararcters')
      return
    }

    const user = {
      name: Name,
      age: Age,
      email: Email,
      password: password,
      saved: [],
    };

    try {
      setLoading(true);
      const response = await addUser(user);

      if (response.success) {
        Alert.alert("Account Created");
        setSignup(false)
      } else {
        Alert.alert("Signup Failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#070529]">
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <View className="flex-1 items-center justify-center px-6">
        <View
          className="w-full max-w-md bg-white/10 p-6 rounded-xl"
          style={{ zIndex: 1 }}
        >
          <Text className="text-white text-2xl font-semibold mb-4 text-center">
            Sign Up
          </Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#ccc"
            className="border border-white text-white px-4 py-3 rounded-full mb-4"
            value={Name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Age"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            maxLength={2}
            className="border border-white text-white px-4 py-3 rounded-full mb-4"
            value={Age}
            onChangeText={setAge}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            textContentType="emailAddress"
            className="border border-white text-white px-4 py-3 rounded-full mb-4"
            value={Email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            className="border border-white text-white px-4 py-3 rounded-full mb-4"
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            className="border border-white text-white px-4 py-3 rounded-full mb-6"
            value={confirm}
            onChangeText={setConfirm}
          />

          <TouchableOpacity
            className="bg-purple-600 py-3 rounded-full"
            onPress={handleSignup}
            disabled={loading}
          >
            <Text className="text-center text-white text-base font-bold">
              {loading ? "Creating..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-center items-center">
            <Text className="text-white py-3">Already have an account? </Text>
            <Text
              onPress={() => setSignup(false)}
              className="text-blue-400 underline"
            >
              Sign In!!
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
