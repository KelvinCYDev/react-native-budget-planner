import Colors from "@/utils/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/utils/SupabaseConfig";
import { decode } from "base64-arraybuffer";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-simple-toast";

const placeholder =
  "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg";
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;

export default function AddNewCategoryItem() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  const [image, setImage] = useState(placeholder as any);
  const [previeImage, setPreviewImage] = useState(placeholder);
  const [name, setName] = useState("" as string);
  const [url, setUrl] = useState("" as string);
  const [cost, setCost] = useState("" as string);
  const [note, setNote] = useState("" as string);
  const [loading, setLoading] = useState(false);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };
  const onClickAdd = async () => {
    setLoading(true);
    const fileName = Date.now();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName + ".png", decode(image), { contentType: "image/png" });
    if (data) {
      const fileUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${fileName}.png`;
      const { data, error } = await supabase
        .from("CategoryItems")
        .insert([
          {
            name: name,
            cost: cost,
            url: url,
            image: fileUrl,
            note: note,
            category_id: categoryId,
          },
        ])
        .select();
      Toast.show("New Item Added!!!", Toast.SHORT);
      setLoading(false);
      router.replace({
        pathname: "/category-detail",
        params: {
          categoryId: categoryId,
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-6">
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image
            source={{ uri: previeImage }}
            className="w-56 h-56 bg-GRAY rounded-xl"
          />
        </TouchableOpacity>
        <View className="p-3 mt-5 flex flex-row gap-10 items-center rounded-xl border-2 border-GRAY">
          <Ionicons
            name="pricetag"
            size={24}
            color={Colors.GRAY}
            className="w-6"
          />
          <TextInput
            placeholder="Item Name"
            className="text-lg w-full"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View className="p-3 mt-5 flex flex-row gap-10 items-center rounded-xl border-2 border-GRAY">
          <FontAwesome
            name="dollar"
            size={24}
            color={Colors.GRAY}
            className="w-6"
          />
          <TextInput
            placeholder="Cost"
            keyboardType="number-pad"
            className="text-lg w-full"
            onChangeText={(value) => setCost(value)}
          />
        </View>
        <View className="p-3 mt-5 flex flex-row gap-10 items-center rounded-xl border-2 border-GRAY">
          <Ionicons name="link" size={24} color={Colors.GRAY} className="w-6" />
          <TextInput
            placeholder="Url"
            onChangeText={(value) => setUrl(value)}
            className="text-lgds"
          />
        </View>
        <View className="p-3 mt-5 flex flex-row gap-10 items-center rounded-xl border-2 border-GRAY">
          <Ionicons
            name="pencil"
            size={24}
            color={Colors.GRAY}
            className="w-6"
          />
          <TextInput
            placeholder=" Note"
            onChangeText={(value) => setNote(value)}
            className="text-lg"
            multiline={true}
          />
        </View>
        <TouchableOpacity
          className="p-4 bg-PRIMARY rounded-full mt-6"
          disabled={!name || !cost || loading}
          onPress={() => onClickAdd()}
        >
          <Text className="text-center font-[outfit-bold] text-lg text-WHITE">
            Add
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
