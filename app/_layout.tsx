import { Stack } from "expo-router";
import "@/global.css";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-new-category"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Category",
        }}
      />
      <Stack.Screen
        name="add-new-category-item"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Item",
        }}
      />
      <Stack.Screen
        name="category-detail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
