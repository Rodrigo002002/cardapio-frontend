import React, { Fragment, useEffect, useState } from 'react';
import { HFoodSave } from '../../../hooks/food-hock';
import { useTranslation } from 'react-i18next';
import DynamicInput from '../../form/inputs/dynamic-input';
import { FoodInterface } from '../../../types/food-interface';
import { Dialog, Transition } from '@headlessui/react';
import PriceInput from '../../form/inputs/price-input';
import IconX from '../../Icon/IconX';

interface ModalProps {
    showModal: boolean,
    closeModal(): void
}

const CreateFoodModal = ({closeModal, showModal}: ModalProps) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const {mutate, isSuccess, isPending} = HFoodSave();
    const { t, i18n } = useTranslation();

    const submit = () => {
        const foodData: FoodInterface = {
            id: null,
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess]);
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
                                <div
                                    className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">{t('register')}</h5>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="text-white-dark hover:text-dark"
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <form onSubmit={submit} className="space-y-5">
                                        <DynamicInput label={t('title')} value={title} isRequired={true}
                                                      updateValue={setTitle} />
                                        <PriceInput label={t('price')} value={price} isRequired={true} updateValue={setPrice} />
                                        <DynamicInput label={t('image')} value={image} isRequired={true} updateValue={setImage} />

                                        <div className='flex w-full mt-5 justify-end'>

                                            <button className="btn btn-primary" type="submit">
                                                {isPending ? t('registering') : t('register')}
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
