import { Stack } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from '@/cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'


export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
  
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaProvider>
           <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
              <StatusBar backgroundColor={'black'} />
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
         </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}