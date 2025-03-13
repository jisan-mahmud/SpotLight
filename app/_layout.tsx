import { StatusBar, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/initialLayout";
import ClerkAndConvexProvider from "@/provider/ClerkAndConvexProvider";


export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
  
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
            <InitialLayout/>
          </SafeAreaView>
        </SafeAreaProvider>
    </ClerkAndConvexProvider>
  )
}