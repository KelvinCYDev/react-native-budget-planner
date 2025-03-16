import { supabase } from "@/utils/SupabaseConfig";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import Toast from "react-native-simple-toast";

export default function ItemList({
  categoryData,
  getCategoryDetail,
}: {
  categoryData: categoryDataType;
  getCategoryDetail: () => Promise<void>;
}) {
  const [explandItem, setExpandItem] = useState(0);

  const onDeleteItem = async (id: string) => {
    const { error } = await supabase
      .from("CategoryItems")
      .delete()
      .eq("id", id);
    Toast.show("Item Deleted!", Toast.SHORT);
    getCategoryDetail();
  };

  const openURL = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };
  return (
    <View className="mt-10">
      <Text className="font-[outfit-bold] text-xl">Item List</Text>
      <View className="mt-5">
        {categoryData?.CategoryItems?.length > 0 ? (
          categoryData?.CategoryItems?.map((item: any, index: number) => (
            <View key={index}>
              <TouchableOpacity
                key={index}
                className="flex flex-row justify-between items-center mt-5"
                onPress={() => setExpandItem(index)}
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-24 h-24 rounded-xl"
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text className="font-[outfit-bold] text-2xl">
                    {item.name}
                  </Text>
                  <Text className="font-[outfit] text-GRAY" numberOfLines={2}>
                    {item.url}
                  </Text>
                </View>
                <Text className="text-lg font-[outfit-bold]">${item.cost}</Text>
              </TouchableOpacity>
              {explandItem == index && (
                <View className="flex flex-row gap-3 justify-end">
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
              {categoryData?.CategoryItems.length - 1 != index && (
                <View className="border mt-5 border-GRAY"></View>
              )}
            </View>
          ))
        ) : (
          <Text className="font-[outfit-bold] text-xl text-GRAY">
            No Item Found
          </Text>
        )}
      </View>
    </View>
  );
}
