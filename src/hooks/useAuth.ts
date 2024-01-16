import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>();

    useEffect(() => {
        // SecureStore.deleteItemAsync("username")
        SecureStore.getItemAsync("username")
            .then((res) => setUsername(res))
            .finally(() => setLoading(false));
    }, [])

    return { isLoggedin: username, username, loading }
};

export default useAuth;