import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProps } from '../types/NavigationTypes'

const Notice: React.FC<NavigationProps<"Notice">> = () => {
    return (
        <SafeAreaView>
            <Text>Notice</Text>
        </SafeAreaView>
    )
}

export default Notice