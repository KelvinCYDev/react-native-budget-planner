import Colors from "@/utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart/v3api";

function CircularChart() {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  return (
    <View className="bg-white p-5 rounded-3xl shadow-md">
      <Text className="text-xl font-[outfit-regular] mb-5">
        Total Estimate: <Text className="font-[outfit-bold]">$0</Text>
      </Text>
      <View className="mt-2 flex flex-row gap-10">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        <View className="flex flex-row gap-1 items-center">
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={Colors.GRAY}
          />
          <Text className="font-[outfit-regular]">NA</Text>
        </View>
      </View>
    </View>
  );
}

export default CircularChart;
