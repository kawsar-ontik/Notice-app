import React from 'react'
import { View, TextInput, Text } from 'react-native'

interface Props {
    label: string;
    placeholder: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
    onBlur?: (e: unknown) => void
}

const Input: React.FC<Props> = ({ label, placeholder, onChangeText, onBlur, secureTextEntry = false }) => {
    return (
        <View className='py-3'>
            <Text className='text-sm pb-2'>{label}</Text>
            <TextInput
                placeholder={placeholder}
                className='border rounded-lg border-gray-200 p-4'
                onChangeText={onChangeText}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default Input;