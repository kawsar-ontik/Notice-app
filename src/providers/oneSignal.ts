import { LogLevel, OneSignal } from "react-native-onesignal";

export const oneSignalInitialization = () => {
    OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID as string);
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
}

export const requestPushPermission = async () => {
    let permission = OneSignal.Notifications.hasPermission()
    if (!permission) await OneSignal.Notifications.requestPermission(true);
}

export const oneSignalLogin = (username: string) => {
    OneSignal.login(username);
}