import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function index() {
  const {signOut} = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={()=> signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}