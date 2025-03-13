import React from 'react'
import { tokenCache } from '@/cache'
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

export default function ClerkAndConvexProvider({children}) {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
    const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
        unsavedChangesWarning: false,
    });

    if (!publishableKey) {
      throw new Error(
        'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
      )
    }


    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ClerkLoaded>{children}</ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}