import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="d-flex flex-row w-full flex-1 justify-center items-center min-w-[110px] min-h-16 mt-4 rounded-full overflow-hidden"
      >
        <Image source={icon} className="size-5" tintColor="#151312" />
        <Text className="text-secondary text-base font-semibold ml-2 ">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};

const _layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarItemStyle:{
        width:'100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      tabBarStyle:{
        backgroundColor: "black",
        borderRadius: 50,
        marginBottom: 32,
        height: 52,
        marginHorizontal: 20,
        position: 'absolute',
        overflow: "hidden",
        borderWidth:1,
        borderColor: 'black'
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
