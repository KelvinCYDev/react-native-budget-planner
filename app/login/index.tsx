import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import loginBg from "@/assets/images/loginbg.png";
import Colors from "@/utils/Colors";
import services from "@/utils/services";
import { useRouter } from "expo-router";
import client from "@/utils/KindeConfig";

export default function Login() {
  const router = useRouter();

  const handleSignIn = async () => {
    const token = await client.login().catch((err) => console.log(err));
    console.log("btn click");
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View className="flex items-center">
      <Image
        source={loginBg}
        className="w-[200px] h-[400px] mt-20 border-[7px] rounded-3xl border-black"
      />
      <View className="bg-[#8B42FC] w-full h-full p-5 -mt-7 rounded-t-[30px]">
        <Text className="text-[35px] font-bold text-center color-white">
          Personal Budget Planner
        </Text>
        <Text className="text-[18px] mt-[20px] text-center color-white">
          Stay on Track, Event by Event: Your Personal Budget Planner App!
        </Text>
        <TouchableOpacity
          className="bg-white py-[15px] px-[5px] rounded-[20px] mt-[30px]"
          onPress={handleSignIn}
        >
          <Text className="text-center color-[#8B42FC]">Login/Signup</Text>
        </TouchableOpacity>
        <Text className="text=[13px] color-[#B6B4B4] mt-[10px]">
          * By login/signup you will agree to our tearms and conditions
        </Text>
      </View>
    </View>
  );
}
