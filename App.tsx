import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Notice from './src/screens/Notice';
import useAuth from './src/hooks/useAuth';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { oneSignalInitialization } from './src/providers/oneSignal';

const Stack = createNativeStackNavigator();

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
};

export default function App() {
  const { isLoggedin, loading } = useAuth();

  useEffect(() => {
    oneSignalInitialization();
  }, []);

  if (loading) return <ActivityIndicator className='flex items-center justify-center h-screen' />

  return (
    <NavigationContainer theme={THEME}>
      <Stack.Navigator initialRouteName='Notice' screenOptions={{ headerShown: false }}>
        {isLoggedin ?
          <Stack.Screen name="Notice" component={Notice} />
          : <Stack.Screen name="Login" component={Login} />
        }
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
