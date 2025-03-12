import { Text, TouchableOpacity, View } from "react-native";
import services from "@/utils/services";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { client } from "@/utils/KindeConfig";

export default function Index() {
  const router = useRouter();

  /**
   * Used to check user Is already auth or not
   */
  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
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

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <View className="flex flex-1 justify-center items-center">
      <TouchableOpacity
        className="bg-white py-[15px] px-[5px] rounded-[20px] mt-[30px]"
        onPress={handleLogout}
      >
        <Text className="text-center color-PRIMARY">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
