import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Colors from "../utils/Colors";

export default function ColorPicker({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <View className="flex flex-row gap-10 mt-10">
      {Colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          className="h-9 w-9 rounded-full"
          style={[
            {
              backgroundColor: color,
            },
            selectedColor == color && { borderWidth: 4 },
          ]}
          onPress={() => setSelectedColor(color)}
        ></TouchableOpacity>
      ))}
    </View>
  );
}
