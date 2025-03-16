import Colors from "@/utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";

function CircularChart({ categoryList }: { categoryList: categoryListType }) {
  const widthAndHeight = 150;
  const [series, setSeries] = useState([{ value: 1, color: Colors.GRAY }]);
  const [totalCalculatedEstimate, setTotalCalculatestimate] = useState(0);

  const updateCircularChart = () => {
    let totalEsimates = 0;
    let otherCost = 0;
    setSeries([{ value: 1, color: Colors.GRAY }]);
    categoryList?.forEach((category, index) => {
      let itemTotalCost = 0;
      category.CategoryItems?.forEach((item_: any) => {
        itemTotalCost = itemTotalCost + item_.cost;
        totalEsimates = totalEsimates + item_.cost;
      });
      setSeries((series) => [
        ...series,
        { value: itemTotalCost, color: category.color },
      ]);
    });
    setTotalCalculatestimate(totalEsimates);
  };

  useEffect(() => {
    categoryList && updateCircularChart();
  }, [categoryList]);

  return (
    <View className="bg-white p-5 rounded-3xl shadow-md">
      <Text className="text-xl font-[outfit-regular] mb-5">
        Total Estimate:{" "}
        <Text className="font-[outfit-bold]">${totalCalculatedEstimate}</Text>
      </Text>
      <View className="mt-2 flex flex-row gap-10">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          cover={{ radius: 0.65, color: "#FFF" }}
        />
        {categoryList?.length == 0 ? (
          <View className="flex flex-row gap-1 items-center">
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={Colors.GRAY}
            />
            <Text className="font-[outfit-regular]">NA</Text>
          </View>
        ) : (
          <View>
            {categoryList?.map((category, index) => (
              <View
                key={index}
                className="flex flex-row gap-3 items-center py-1"
              >
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={24}
                  color={Colors.COLOR_LIST[index]}
                />
                <Text>{category.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default CircularChart;
