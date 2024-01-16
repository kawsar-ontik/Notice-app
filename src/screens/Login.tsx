import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store';
import ErrorMessage from '../components/ErrorMessage'

const schema = Yup.object().shape({
    username: Yup.string().required("User name field is mandatory.").min(3, "Ensure your username has at least 3 characters."),
    password: Yup.string().required("Password field is mandatory.").min(8, "Password must be at least 8 characters long."),
})

export default function Login() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            if (formik.isValid) {
                setLoading(true);
                // Saving username as authenticated token 
                SecureStore.setItemAsync("username", values.username)
                    .then(() => console.log("Move to notice screen"))
                    .catch((err) => setError(err)) // will never encounter
                    .finally(() => setLoading(false));
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

                    {formik.touched.username && formik.errors.username && (<ErrorMessage error={formik.errors.username} />)}

                    <Input
                        label='Password'
                        placeholder='Enter your password'
                        onChangeText={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        secureTextEntry
                    />

                    {formik.touched.password && formik.errors.password && (<ErrorMessage error={formik.errors.password} />)}
                </View>

                {error && <ErrorMessage error={error} style='mb-4' />}

                <Button loading={loading} title='Login' type='primary' style='w-full' onPress={formik.handleSubmit} />
            </View>
        </SafeAreaView>
    )
}