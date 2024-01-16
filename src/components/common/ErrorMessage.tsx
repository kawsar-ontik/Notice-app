import React from 'react'
import { Text } from 'react-native'

interface Props {
    error: string;
    style?: string;
}

const ErrorMessage: React.FC<Props> = ({ error, style }) => {
    return (
        <Text className={`text-sm text-red-600 mb-2 ${style}`}>{error}</Text>
    )
}

export default ErrorMessage;