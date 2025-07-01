import { Stack } from "expo-router";
import { AppProvider } from "./context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="Login/signup" options={{ headerShown: false }} />
        <Stack.Screen name="Login/Login" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
