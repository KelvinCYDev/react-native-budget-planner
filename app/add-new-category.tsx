import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-simple-toast";
import Colors from "@/utils/Colors";
import ColorPicker from "@/components/ColorPicker";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/utils/SupabaseConfig";
import { client } from "@/utils/KindeConfig";
import { router } from "expo-router";

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [categoryName, setCategoryName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: categoryName,
          assigned_budget: totalBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();
    if (data) {
      router.replace({
        pathname: "/category-detail",
        params: {
          categoryId: data[0].id,
        },
      });
      setLoading(false);
      Toast.show("Category Created!", Toast.SHORT);
    }
    if (error) {
      setLoading(false);
    }
  };

  return (
    <View className="mt-10 p-10">
      <View className="justify-center items-center">
        <TextInput
          style={{ backgroundColor: selectedColor }}
          className="text-center text-3xl py-8 rounded-full px-9 text-WHITE"
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </View>
      {/* Add Category Name and Total Budget Section  */}
      <View className="flex flex-row gap-5 items-center mt-10 border-2 p-3 rounded-xl border-GRAY bg-WHITE">
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Category Name"
          onChangeText={(v: string) => setCategoryName(v)}
          style={{ width: "100%", fontSize: 17 }}
        />
      </View>
      <View className="flex flex-row gap-5 items-center mt-8 border-2 p-3 rounded-xl border-GRAY bg-WHITE">
        <FontAwesome6 name="dollar-sign" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Total Budget"
          keyboardType="numeric"
          onChangeText={(v: string) => setTotalBudget(v)}
          style={{ width: "100%", fontSize: 17 }}
        />
      </View>
      <TouchableOpacity
        className="bg-PRIMARY p-6 rounded-xl mt-12"
        disabled={!categoryName || !totalBudget || loading}
        onPress={() => onCreateCategory()}
      >
        {loading ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text
            style={{ textAlign: "center", fontSize: 16, color: Colors.WHITE }}
          >
            Create
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
