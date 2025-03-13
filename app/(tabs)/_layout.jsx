import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel: false, 
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: 'black',
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 10
        }
      }}>
        <Tabs.Screen name='index' options={{
          tabBarIcon: ({size, color}) => <Ionicons name='home' size={size} color={color}/>
        }}/>
        <Tabs.Screen name='bookmark' options={{
          tabBarIcon: ({size, color}) => <Ionicons name='bookmark' size={size} color={color}/>
        }}/>
        <Tabs.Screen name='create' options={{
          tabBarIcon: ({size, color}) => <Ionicons name='add-circle' size={size} color={COLORS.primary}/>
        }}/>
        <Tabs.Screen name='notifications'options={{
          tabBarIcon: ({size, color}) => <Ionicons name='heart' size={size} color={color}/>
        }}/>
        <Tabs.Screen name='profile' options={{
          tabBarIcon: ({size, color}) => <Ionicons name='person' size={size} color={color}/>
        }}/>
    </Tabs>
  )
}