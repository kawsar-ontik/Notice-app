import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    username: Yup.string().required("User name field is mandatory.").min(3, "Ensure your username has at least 3 characters."),
    password: Yup.string().required("Password field is mandatory.").min(8, "Password must be at least 8 characters long."),
})

export default function Login() {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (formik.isValid) {
                console.log(values)
            }
        },
    })

    return (
        <SafeAreaView>
            <View className="flex justify-center h-screen p-4">
                <Text className="text-3xl font-semibold max-w-xs">Welcome back! Glad to see you again!</Text>
                <View className='my-4'>
                    <Input
                        label='Username'
                        placeholder='Enter your username'
                        onChangeText={formik.handleChange("username")}
                        onBlur={formik.handleBlur("username")} />

                    {formik.touched.username && formik.errors.username && (
                        <Text className='text-sm text-red-600 mb-2'>{formik.errors.username}</Text>
                    )}

                    <Input
                        label='Password'
                        placeholder='Enter your password'
                        onChangeText={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        secureTextEntry
                    />

                    {formik.touched.password && formik.errors.password && (
                        <Text className='text-sm text-red-600 mb-2'>{formik.errors.password}</Text>
                    )}
                </View>
                <Button title='Login' type='primary' className='w-full' onPress={formik.handleSubmit} />
            </View>
        </SafeAreaView>
    )
}