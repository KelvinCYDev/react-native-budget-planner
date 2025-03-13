import { Text, TouchableOpacity, View } from "react-native";
import services from "@/utils/services";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { client } from "@/utils/KindeConfig";
import { supabase } from "@/utils/SupabaseConfig";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";
import Colors from "@/utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import CircularChart from "@/components/CircularChart";

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
    // getCategoryList();
  }, []);

  return (
    <View className="flex">
      <SafeAreaView
        edges={["top"]}
        style={{ backgroundColor: Colors.PRIMARY }}
      />
      <View className="flex gap-10 px-5 py-2 bg-PRIMARY h-[150px]">
        <Header />
        <CircularChart />
      </View>
    </View>
  );
}
