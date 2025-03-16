import { RefreshControl, ScrollView, View } from "react-native";
import services from "@/utils/services";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { client } from "@/utils/KindeConfig";
import { supabase } from "@/utils/SupabaseConfig";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";
import Colors from "@/utils/Colors";
import Header from "@/components/Header";
import CircularChart from "@/components/CircularChart";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "@/components/CategoryList";

export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState({} as UserProfile);
  const [categoryList, setCategoryList] = useState([] as categoryListType);
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState(false);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 20) {
      setBlur(true);
    } else {
      setBlur(false);
    }
  };

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
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", user.email);
    setCategoryList(data);
    data && setLoading(false);
  };

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  return (
    <View className="flex-1">
      <View className="bg-PRIMARY h-[230px] w-full absolute" />
      <View className="h-full">
        <ScrollView
          className="px-5 mt-48 overflow-visible"
          contentContainerStyle={{ flex: 0 }}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              onRefresh={() => getCategoryList()}
              refreshing={loading}
            />
          }
        >
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </ScrollView>
        <Header blur={blur} />
      </View>
      <Link href={"/add-new-category"} className="absolute bottom-3 right-3">
        <Ionicons name="add-circle" size={64} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}
