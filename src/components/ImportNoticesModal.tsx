import { Modal, Platform, Text, View } from 'react-native'
import React from 'react'
import Button from './common/Button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
    show: boolean
    close: () => void;
}

const ImportNoticesModal: React.FC<Props> = ({ show, close }) => {

    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <Modal
            animationType="slide"
            visible={show}
            transparent={true}
            onRequestClose={close}
        >
            <View className="mt-auto  rounded-t-3xl py-6 px-4 bg-gray-300 space-y-4">
                <Text className="text-3xl font-semibold">Great! Now Choose Your Preference</Text>
                <Text className='text-base leading-7'>You have the option to import notices from your files or you can choose to continue without importing. Please select the option that best suits your needs</Text>
                <View className={`flex flex-row justify-end items-end ${Platform.OS === "ios" ? "mb-6" : ""}`}>
                    <Button
                        type='secondary'
                        title='Import'
                        onPress={() => console.log("Clicked 1")}
                    />
                    <Button
                        title='Continue'
                        onPress={() => {
                            close();
                            navigate("Notice");
                        }}
                        style='ml-4'
                    />
                </View>
            </View>
        </Modal>

    )
}

export default ImportNoticesModal;