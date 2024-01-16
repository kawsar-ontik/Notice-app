import React from 'react'
import { Pressable, Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store';

const Header = () => {
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("username");
    }

    return (
        <View className='bg-black p-4 flex flex-row justify-between items-center'>
            <Text className='text-white text-xl font-semibold'>Notices</Text>
            <Pressable onPress={handleLogout}>
                <Text className='text-white'>Logout</Text>
            </Pressable>
        </View>
    )
}

export default Header