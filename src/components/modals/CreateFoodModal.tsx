import {useEffect, useState} from "react";
import { HFoodSave } from '../../hooks/food-hock';
import { FoodInterface } from '../../types/food-interface';
import { useTranslation } from 'react-i18next';
import DynamicInput from '../form/inputs/dynamic-input';

interface ModalProps {
    closeModal(): void
}

const CreateFoodModal = ({closeModal}: ModalProps) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const {mutate, isSuccess, isPending} = HFoodSave();
    const { t } = useTranslation();

    const submit = () => {
        const foodData: FoodInterface = {
            title,
            price,
            image
        }

        mutate((foodData))
    }

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess]);

    return (
        <div className="mb-5">
            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <div
                        className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h2 className="text-2xl">Cadastro comida</h2>
                            <button className="text-white-dark hover:text-dark" onClick={closeModal}>Cancelar</button>
                        </div>
                        <div className="p-5">
                            <form onSubmit={submit}>
                                <DynamicInput label={t('title')} value={title} isRequired={true} updateValue={setTitle} />
                                <DynamicInput label={t('price')} value={price} isRequired={true} updateValue={setPrice} />
                                <DynamicInput label={t('image')} value={image} isRequired={true} updateValue={setImage} />

                                <div className='flex w-full mt-5 justify-end'>
                                    <button className="btn btn-primary" type="submit">
                                        {isPending ? 'Postando...' : 'Postar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFoodModal
