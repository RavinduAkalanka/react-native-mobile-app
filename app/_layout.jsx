import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import LoginScreen from './../Components/LoginScreen';
import * as SecureStore from "expo-secure-store";


const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-semibold": require("./../assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <ClerkProvider tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SignedIn>

      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}

export function Home() {
  return (
    <View>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 50 }}>Home</Text>
    </View>
  );
}
