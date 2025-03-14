import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Info({
  categoryData,
}: {
  categoryData: categoryDataType;
}) {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  const onDeleteCategory = () => {};
  const calculateTotalPerc = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach((item: any) => {
      total = total + item.cost;
    });
    setTotalCost(total);
    let perc = (total / categoryData.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }
    setPercTotal(perc);
  };
  useEffect(() => {
    categoryData && calculateTotalPerc();
  }, [categoryData]);

  return (
    <View>
      <View className="mt-8 flex flex-row justify-between items-center">
        <View className="justify-center items-baseline">
          <Text
            className="text-4xl p-4 rounded-xl text-center"
            style={{ backgroundColor: categoryData.color }}
          >
            {categoryData.icon}
          </Text>
        </View>
        <View className="flex-1 ml-10">
          <Text className="font-[outfit-bold] text-xl">
            {categoryData?.name}
          </Text>
          <Text className="font-[outfit] text-lg">
            {categoryData?.CategoryItems?.length} Item
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteCategory()}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between mt-12">
        <Text style={{ fontFamily: "outfit-bold" }}>${totalCost}</Text>
        <Text style={{ fontFamily: "outfit" }}>
          Total Budget:{categoryData.assigned_budget}
        </Text>
      </View>
      <View className="w-full h-8 bg-GRAY rounded-full">
        <View
          className="bg-PRIMARY rounded-full h-8 "
          style={{ width: `${percTotal}%` }}
        ></View>
      </View>
    </View>
  );
}
