import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function CategoryList({
  categoryList,
}: {
  categoryList: any[] | null;
}) {
  const onCategoryClick = (category: any) => {
    router.push({
      pathname: "/category-detail",
      params: {
        categoryId: category.id,
      },
    });
  };

  return (
    <View>
      <Text className="font-[outfit-bold] text-3xl mt-10 mb-3">
        Latest Budget
      </Text>
      {categoryList?.map((category, index) => {
        return (
          <TouchableOpacity
            key={index}
            className="my-2 flex flex-row gap-3 items-center rounded-xl bg-WHITE p-3 shadow-mdm"
            onPress={() => onCategoryClick(category)}
          >
            <View className="justify-center items-baseline">
              <Text
                className="text-4xl p-4 rounded-xl text-center"
                style={{ backgroundColor: category?.color }}
              >
                {category.icon}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center w-3/4">
              <View>
                <Text className="text-xl font-[outfit-bold]">
                  {category.name}
                </Text>
                <Text className="text-lg font-[outfit]">
                  {category?.CategoryItems?.length} Items
                </Text>
              </View>
              <Text className="text-lg font-[outfit-bold]">$5000</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
