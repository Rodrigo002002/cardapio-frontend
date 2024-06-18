import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DynamicInput from '../../form/inputs/dynamic-input';
import { FoodInterface } from '../../../types/food-interface';
import { SFoodFindById, SFoodUpdate } from '../../../services/food-service';
import { HFoodUpdate } from '../../../hooks/food-hock';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
    showModal: boolean,
    id: number,
    closeModal(): void
}

const CreateFoodModal = ({showModal, closeModal, id}: ModalProps) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const {mutate, isSuccess, isPending} = HFoodUpdate(id, { id, title, price, image });

    const { t } = useTranslation();

    const submit = () => {
        if (id) {
            const foodData = {
                id,
                title,
                price,
                image
            }
            mutate(id, foodData);
        }
    }

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    const getData = () => {
        SFoodFindById(id).then(r => {
            setTitle(r.data.title);
            setPrice(r.data.price);
            setImage(r.data.image);
        });
    }

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" open={showModal} onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Editar</h5>
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CreateFoodModal
