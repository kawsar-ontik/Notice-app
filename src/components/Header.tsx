import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const { removeUsername: logout } = useAuth();
    const navigation = useNavigation();

    return (
        <View className='bg-black p-4 flex flex-row justify-between items-center'>
            <Text className='text-white text-xl font-semibold'>Notices</Text>
            <TouchableOpacity onPress={() => {
                logout();
                navigation.navigate("Login" as never);
            }}>
                <Text className='text-white'>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header