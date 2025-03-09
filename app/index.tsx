import { Text, View } from "react-native";
import services from "@/utils/services";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
  }, []);

  /**
   * Used to check user Is already auth or not
   */
  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    }
  };

  return (
    <View className="flex flex-1 justify-center items-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View className="w-10 h-10 bg-blue-500" />
    </View>
  );
}
