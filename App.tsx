import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Notice from './src/screens/Notice';
import useAuth from './src/hooks/useAuth';
import { ActivityIndicator, AppState } from 'react-native';
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useEffect } from 'react';

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

  const initOneSignal = async () => {
    OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID as string);
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // OneSignal.login("hello_world");

    const hasPermission = OneSignal.Notifications.hasPermission()
    console.log("Device State: ", hasPermission)
    if (!hasPermission) await OneSignal.Notifications.requestPermission(true);
  };

  useEffect(() => {
    initOneSignal();

    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') initOneSignal();
    });
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
