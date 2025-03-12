import { Text, TouchableOpacity, View } from "react-native";
import services from "@/utils/services";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { client } from "@/utils/KindeConfig";
import { supabase } from "@/utils/SupabaseConfig";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";

export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState({} as UserProfile);

  /**
   * Used to check user Is already auth or not
   */
  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    } else {
      const user = await client.getUserDetails();
      setUser(user);
    }
  };

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login");
      // User was logged out
    }
  };

  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", user.email);
    console.log("Data", data);
  };

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  return (
    <View className="flex flex-1 justify-center items-center">
      <Text>Hello {user.given_name}</Text>
      <TouchableOpacity
        className="bg-white py-[15px] px-[5px] rounded-[20px] mt-[30px]"
        onPress={handleLogout}
      >
        <Text className="text-center color-PRIMARY">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
