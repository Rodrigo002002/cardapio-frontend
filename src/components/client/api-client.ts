import axios, { AxiosInstance } from 'axios';

export const FoodClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});
