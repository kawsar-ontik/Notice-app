import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);

    const saveUsername = async (username: string) => {
        return SecureStore.setItemAsync("username", username)
            .then(() => setUsername(username))
            .catch(() => "Failed to store username");
    };

    const removeUsername = async () => {
        await SecureStore.deleteItemAsync("username");
    };

    useEffect(() => {
        SecureStore.getItemAsync("username")
            .then((res) => setUsername(res))
            .finally(() => setLoading(false));
    }, [])

    return { isLoggedin: username, username, loading, saveUsername, removeUsername }
};

export default useAuth;
