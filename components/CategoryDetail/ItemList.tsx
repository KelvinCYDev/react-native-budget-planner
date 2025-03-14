import { supabase } from "@/utils/SupabaseConfig";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function ItemList({
  categoryData,
}: {
  categoryData: categoryDataType;
}) {
  const [explandItem, setExpandItem] = useState(0);
  return (
    <View className="mt-10">
      <Text className="font-[outfit-bold] text-xl">Item List</Text>
      <View className="mt-8">
        {categoryData?.CategoryItems?.length > 0 ? (
          categoryData?.CategoryItems?.map((item: any, index: number) => (
            <>
              <TouchableOpacity
                key={index}
                className="flex flex-row justify-between items-center"
                onPress={() => setExpandItem(index)}
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-20 h-20 rounded-xl"
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
              {/* {explandItem==index&&
            <View style={styles.actionItemContainer}>
                <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                </TouchableOpacity>
            </View>
            } */}
              {categoryData?.CategoryItems.length - 1 != index && (
                <View className="border-1 mt-5 border-GRAY"></View>
              )}
            </>
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
