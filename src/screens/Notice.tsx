import { ActivityIndicator, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProps } from '../types/NavigationTypes'
import Header from '../components/Header'
import { FlashList } from '@shopify/flash-list'
import { requestPushPermission } from '../providers/oneSignal'
import useAuth from '../hooks/useAuth'
import { OneSignal } from 'react-native-onesignal'

const NOTICES = [
    {
        title: "Test Wireframe",
        message: "Hello World, This is an random subtitle",
        timestamp: new Date()
    },
    {
        title: "Test Wireframe 1",
        message: "Hello World, This is an random subtitle",
        timestamp: new Date()
    },
    {
        title: "Test Wireframe 2",
        message: "Hello World, This is an random subtitle",
        timestamp: new Date()
    },
]

const Notice: React.FC<NavigationProps<"Notice">> = ({ navigation }) => {

    const { isLoggedin, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!isLoggedin) navigation.navigate("Login");

        if (!loading && isLoggedin) requestPushPermission();
    }, [loading, isLoggedin])

    useEffect(() => {
        OneSignal.Notifications.addEventListener('click', (event) => {
            console.log('OneSignal: notification clicked:', event);
        });
    }, [])

    return (
        <SafeAreaView>
            <Header />
            <View className='h-full p-4'>
                <FlashList
                    data={NOTICES}
                    renderItem={({ item }) => (
                        <View className='bg-gray-300 p-4 rounded-lg'>
                            <Text>{item.title}</Text>
                            <Text>{item.message}</Text>
                            <Text>{item.timestamp.toDateString()}</Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View className='h-4' />}
                    estimatedItemSize={1}
                />
            </View>
        </SafeAreaView>
    )
}

export default Notice