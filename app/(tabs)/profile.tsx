import { images } from "@/constants/images";
import { changePassword } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../Login/Login";
import SignUp from "../Login/signup";
import { AppContext } from "../context/AppContext";

interface User {
  email?: string;
  name?: string;
  age?: number;
  saved?: [string];
}

function Profile() {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("AppContext must be used within an AppProvider");

  const { setEmailContext, setSaved } = context;

  const [isLoggedin, setLoggedin] = useState(false);
  const [signupPage, setSignup] = useState(false);
  const [userData, setUserData] = useState<User>({});
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [signupPage]);

  const handleChangePass = async () => {
    try {
      setLoading(true);
      if (password === confirm) {
        const response = await changePassword(userData.email || "", password);
        if (response) {
          alert("Password is changed");
        } else {
          alert("Error plese tyr again");
        }
      } else {
        alert("Password don't match");
      }
    } catch (error) {
      alert("Server error please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#070529]">
      {/* Background image */}
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {!isLoggedin ? (
        !signupPage ? (
          <Login
            setSignup={setSignup}
            setLoggedin={setLoggedin}
            setUserData={setUserData}
          />
        ) : (
          <SignUp setSignup={setSignup} />
        )
      ) : (
        <SafeAreaView className="flex-1 px-4">
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="items-center mt-8">
              {/* Profile Image */}
              <View className="h-[150px] w-[150px] rounded-full overflow-hidden border-2 border-white mb-6">
                <Image
                  source={images.profilepic}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Heading */}
              <Text className="text-white text-2xl font-bold mb-2">
                Welcome, {userData.name}!
              </Text>

              {/* Email */}
              <Text className="text-white text-base mb-6 opacity-80">
                Email: {userData.email}
              </Text>
            </View>

            <View className="bg-white/10 p-5 rounded-xl">
              <Text className="text-white text-lg font-semibold mb-4 text-center">
                Change Password
              </Text>

              <TextInput
                placeholder="New Password"
                placeholderTextColor="#ccc"
                className="text-white border border-white mb-4 px-4 py-3 rounded-full"
                secureTextEntry
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#ccc"
                className="text-white border border-white mb-6 px-4 py-3 rounded-full"
                secureTextEntry
                textContentType="password"
                value={confirm}
                onChangeText={(text) => setConfirm(text)}
              />

              <TouchableOpacity
                className="bg-purple-600 py-3 rounded-full"
                onPress={handleChangePass}
              >
                <Text className="text-center text-white font-bold">
                  {loading ? "Updating..." : "Update Password"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white/10 p-5 rounded-xl mt-3">
              <TouchableOpacity
                className="bg-red-600 py-3 rounded-full"
                onPress={() => {
                  setPassword("");
                  setConfirm("");
                  setEmailContext("");
                  setSaved([]);
                  setLoggedin(false);
                }}
              >
                <Text className="text-center text-white font-bold">
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

export default Profile;
