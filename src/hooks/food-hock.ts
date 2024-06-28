import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SFoodDelete, SFoodFindAll, SFoodFindById, SFoodSave, SFoodUpdate } from '../services/food-service';
import { FoodInterface } from '../types/food-interface';

export async function HGetAllFood() {
    const query = useQuery({
        queryFn: SFoodFindAll,
        queryKey: ['food-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    };
}

export function HGetFoodById(id: number) {
    const query = useQuery({
        queryKey: ['food', id],
        queryFn: () => SFoodFindById(id),
        enabled: !!id,
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    };
}

export function HFoodSave() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: SFoodSave,
        retry: 2,
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['food-data']);
        }
    });
}

export function HFoodUpdate(id: number, data: FoodInterface) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await SFoodUpdate(id, data);
        },
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['food-data']);
        }
    });
}

export function HFoodDelete(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => SFoodDelete(id),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['food-data']);
        },
        retry: 2
    });
}
