import Colors from "@/utils/Colors";
import { client } from "@/utils/KindeConfig";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function Header({ blur }: { blur: boolean }) {
  const [user, setUser] = useState({} as UserProfile);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <BlurView
      intensity={blur ? 30 : 0}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      className={`bg-opacity-0 pt-20 pb-3 px-5 absolute top-0 flex flex-row items-center gap-3 ${
        blur && "shadow-md"
      }`}
    >
      <Image
        source={{ uri: user?.picture }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 99,
        }}
      />
      <View className="flex-1 flex-row items-center justify-between">
        <View>
          <Text className="text-WHITE text-xl font-[outfit-regular]">
            Welcome,
          </Text>
          <Text className="text-WHITE text-2xl font-[outfit-bold]">
            {user?.given_name}
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color="white" />
      </View>
    </BlurView>
  );
}
