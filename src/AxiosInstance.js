import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL: "https://kidproeduservicesv2.azurewebsites.net/api",
});

instance.interceptors.request.use(
    async (config) => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            const token = JSON.parse(userData).token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error getting token from AsyncStorage:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
