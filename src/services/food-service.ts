import { AxiosPromise } from 'axios';
import { FoodInterface } from '../types/food-interface';
import { FoodClient } from '../components/client/api-client';

export function SFoodFindAll(): AxiosPromise<FoodInterface[]> {
    return FoodClient.get(`/food`);
}

export function SFoodFindById(id: number): AxiosPromise<FoodInterface> {
    return FoodClient.get(`/food/${id}`);
}

export function SFoodSave(data: FoodInterface): AxiosPromise<any> {
    return FoodClient.post(`/food`, data);
}

export function SFoodUpdate(id: number, data: FoodInterface): AxiosPromise<any> {
    console.log(id, data)
    return FoodClient.put(`/food/${id}`, data);
}

export function SFoodDelete(id: number): AxiosPromise<any> {
    return FoodClient.delete(`/food/${id}`);
}
