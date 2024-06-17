
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SFoodFindAll, SFoodSave } from '../services/food-service';
export function HGetAllFood() {
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

export function HFoodSave() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: SFoodSave,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data']);
        }
    });
}
