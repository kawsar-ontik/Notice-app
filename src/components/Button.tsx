import React from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native'

interface Props {
    title: string;
    onPress: () => void;
    loading?: boolean;
    style?: string;
    type?: "primary" | "secondary";
}

const buttonClassesMap = {
    common: "flex items-center justify-center w-40 p-4 rounded-lg",
    primary: "bg-black",
    secondary: "bg-gray-100 border border-gray-300",
};

const Button: React.FC<Props> = ({ title, type = "primary", loading = false, onPress, style }) => {
    const classNames = [buttonClassesMap.common, buttonClassesMap[type], style].join(" ");

    return (
        <Pressable onPress={onPress} className={classNames}>
            {
                loading ?
                    <ActivityIndicator /> : <Text className={`${type === "primary" ? "text-white" : "text-black"} text-sm font-semibold`}>
                        {title}
                    </Text>
            }
        </Pressable>
    )
}

export default Button;