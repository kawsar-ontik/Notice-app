import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
    return (
        <SafeAreaView>
            <View className="flex justify-center h-screen p-4">
                <Text className="text-2xl font-medium max-w-xs">Welcome back! Glad to see you again!</Text>
                <View className='my-4'>
                    <Input label='Username' placeholder='Enter your username' />
                    <Input label='Password' placeholder='Enter your password' />
                    <Button title='Login' type='primary' className='w-full' onPress={() => console.log("Hello World")} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})