import React from "react";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Database from './src/database';
import Theme from "./src/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  let scheme = useColorScheme();
  let theme = Theme(scheme);
  let invertedScheme = (scheme === "dark" ? "light" : "dark") as StatusBarStyle;
  Database.init();

  return (
    <AppearanceProvider>
      <SafeAreaProvider style={{backgroundColor: theme.colors.text}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      <StatusBar
        style={invertedScheme}
        backgroundColor={theme.colors.background}
      />
    </AppearanceProvider>
  );
}

