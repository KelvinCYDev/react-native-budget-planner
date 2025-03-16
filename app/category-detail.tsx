import Info from "@/components/CategoryDetail/Info";
import ItemList from "@/components/CategoryDetail/ItemList";
import Colors from "@/utils/Colors";
import { supabase } from "@/utils/SupabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";

export default function CategoryDetail() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState({} as categoryDataType);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", categoryId);
    data != null && setCategoryData(data[0]);
  };

  useFocusEffect(
    useCallback(() => {
      categoryId && getCategoryDetail();
    }, [categoryId])
  );

  return (
    <View className="flex-1 py-7 px-5 mt-10">
      <TouchableOpacity onPress={() => router.dismissAll()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Info categoryData={categoryData} />
        <ItemList
          categoryData={categoryData}
          getCategoryDetail={getCategoryDetail}
        />
      </ScrollView>
      <Link
        href={{
          pathname: "/add-new-category-item",
          params: {
            categoryId: categoryData.id,
          },
        }}
        className="absolute bottom-7 right-7"
      >
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}
