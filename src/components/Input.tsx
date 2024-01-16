import React from 'react'
import { View, TextInput, Text } from 'react-native'

interface Props {
    label: string;
    placeholder: string;
    onChangeText?: (text: string) => void;
    onBlur?: (e: unknown) => void
}

export default function Input({ label, placeholder, onChangeText, onBlur }: Props) {
    return (
        <View className='py-3'>
            <Text className='text-xs pb-2'>{label}</Text>
            <TextInput
                placeholder={placeholder}
                className='border rounded-lg border-gray-200 p-3'
                onChangeText={onChangeText}
                onBlur={onBlur}
            />
        </View>
    )
}