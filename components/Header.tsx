import Colors from "@/utils/Colors";
import { client } from "@/utils/KindeConfig";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function Header() {
  const [user, setUser] = useState({} as UserProfile);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View className="flex flex-row items-center gap-3">
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
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 16,
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 20,
            }}
          >
            {user?.given_name}
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color="white" />
      </View>
    </View>
  );
}
