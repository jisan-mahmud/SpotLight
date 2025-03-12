import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function login() {
  const { startSSOFlow } = useSSO()
  const router = useRouter();

  const handleLogin = async () => {
    try{
      const {createdSessionId, setActive} = await startSSOFlow({strategy: 'oauth_google'})
      if(createdSessionId && setActive){
        setActive({session: createdSessionId})
        router.replace('/(tabs)')
      }
    }catch{
      console.log('somthing went wrong!')
    }

  }

  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name='leaf' size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>SpotLight</Text>
        <Text style={styles.tagline}>Don't miss anything!</Text>
      </View>

      {/* illustration */}
      <View style={styles.illustrationContainer}>
        <Image 
          style={styles.illustration} 
          source={require('../../assets/images/Social-auth.png'
        )}/>
      </View>

      {/* Google Authentication */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleLogin}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons size={20} color={COLORS.surface} name='logo-google'/>
          </View>
          <Text style={styles.googleButtonText}>Continue With Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By Continue, You agree to your terms and condition.
        </Text>
      </View>
    </View>
  )
}