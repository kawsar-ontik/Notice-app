import { Alert, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProps } from '../types/NavigationTypes'
import Header from '../components/Header'
import { FlashList } from '@shopify/flash-list'
import { requestPushPermission } from '../providers/oneSignal'
import useAuth from '../hooks/useAuth'
import { OneSignal } from 'react-native-onesignal'
import { createTable, getNotices, saveNotice } from '../providers/SQLite'
import { INotice } from '../Interfaces/Notice'

const Notice: React.FC<NavigationProps<"Notice">> = ({ navigation }) => {

    const [notices, setNotices] = useState<INotice[]>([]);
    const { isLoggedin, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!isLoggedin) navigation.navigate("Login");

        if (!loading && isLoggedin) requestPushPermission();
    }, [loading, isLoggedin])

    useEffect(() => {
        createTable(); // Create Database table if not exists

        (async () => {
            const response = await getNotices();
            setNotices(response as INotice[]);
        })()

        OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleForegroundNotification);

        OneSignal.Notifications.addEventListener('click', handleNotificationClick);

        return () => {
            OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleForegroundNotification);

            OneSignal.Notifications.removeEventListener("click", handleNotificationClick);
        };
    }, [])

    const handleForegroundNotification = async (event: any) => {
        const { title, body, notificationId } = event?.notification || {};

        Alert.alert(
            title as string,
            body,
            [
                {
                    text: "OK",
                    onPress: async () => await saveNotice({ title, body, id: notificationId, date: new Date() })
                        .then(() => console.log("Saving Done"))
                }
            ]
        );
    }

    const handleNotificationClick = async (event: any) => {
        const { title, body, notificationId } = event?.notification || {};
        await saveNotice({ title, body, id: notificationId, date: new Date() })
            .then(() => console.log("Saving Done"))
    }

    return (
        <SafeAreaView>
            <Header />
            <View className='h-screen p-4'>
                <FlashList
                    data={notices}
                    renderItem={({ item }) => (
                        <View className='bg-gray-300 p-4 rounded-lg flex space-y-1.5'>
                            <Text className='text-lg font-semibold'>{item.title}</Text>
                            <Text className='text-sm leading-5'>{item.body}</Text>
                            <Text className='text-xs text-right'>{new Date(item.date).toLocaleTimeString()}</Text>
                        </View>
                    )}
                    keyExtractor={(item: INotice) => item?.id}
                    ItemSeparatorComponent={() => <View className='h-4' />}
                    ListEmptyComponent={() => <Text className='text-sm font-medium text-center'>No Notices found</Text>}
                    estimatedItemSize={10}
                />
            </View>

        </SafeAreaView>
    )
}

export default Notice