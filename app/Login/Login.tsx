import { images } from "@/constants/images";
import { checkPassword, getUserByEmail } from "@/services/api";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../context/AppContext";

type SignUpProps = {
  setSignup: (val: boolean) => void;
  setLoggedin: (val: boolean) => void;
  setUserData: (val: object) => void;
};

const Login = ({ setSignup, setLoggedin, setUserData }: SignUpProps) => {

  const context = useContext(AppContext)

  if(!context) throw new Error('AppContext must be used within an AppProvider');

  const {setSaved, setEmailContext} = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordcheck = async () => {

    if(!email.trim()){
      Alert.alert('Require', 'Email is required')
      return
    }
    if(!password.trim()){
      Alert.alert('Require', 'Password is required')
      return
    }
    try {
      setLoading(true);
      const response = await checkPassword(email, password);

      if (response.message === "Password is correct") {
        const userdata = await getUserByEmail(email);

        if (userdata) {
          setUserData(userdata);
          setSaved(userdata.saved);
          setEmailContext(email)
          setLoggedin(true);
        } else {
          Alert.alert('Error',"User data not found.");
        }
      } else {
        Alert.alert('Error',"Wrong Email or Password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert('Server Error',"Something went wrong. Please try again.");
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

      {loading ? (
        <ActivityIndicator size="large" color="#00f" className="mt-10" />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <View
            className="w-full max-w-md bg-white/10 p-6 rounded-xl"
            style={{ zIndex: 1 }}
          >
            <Text className="text-white text-2xl font-semibold mb-4 text-center">
              Login
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#ccc"
              className="border border-white text-white px-4 py-3 rounded-full mb-4"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              className="border border-white text-white px-4 py-3 rounded-full mb-6"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity className="bg-purple-600 py-3 rounded-full">
              <Text
                className="text-center text-white text-base font-bold"
                onPress={passwordcheck}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <View className="flex flex-row justify-center items-center">
              <Text className="text-white py-3 ">Don't have account? </Text>
              <Text
                className="text-blue-400 underline"
                onPress={() => setSignup(true)}
              >
                Create One!!
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
