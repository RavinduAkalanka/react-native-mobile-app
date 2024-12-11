import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { theme } from "../assets/utils/theme";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../Hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  if (useWarmUpBrowser && typeof useWarmUpBrowser === 'function') {
    useWarmUpBrowser();
  } else {
    console.warn('useWarmUpBrowser function is not available');
  }

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 220,
            height: 420,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text
            style={{
              color: theme.primaryColor,
            }}
          >
            Communtity Business Directory
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit-regular",
            textAlign: "center",
            marginVertical: 15,
            color: theme.Gray,
          }}
        >
          Find your favourite business near your and post your own business to
          your community.
        </Text>

        <TouchableOpacity style={styles.staredBtn}
          onPress={onPress}>
          <Text style={{
            fontFamily: "outfit-regular",
            color: '#fff',
            textAlign: 'center'
          }}>Let's Get Stared</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -25,
  },
  staredBtn: {
    backgroundColor: theme.primaryColor,
    padding: 16,
    borderRadius: 60
  }
});