import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DynamicInput from '../../form/inputs/dynamic-input';
import { SFoodDelete, SFoodFindById } from '../../../services/food-service';
import { HFoodUpdate } from '../../../hooks/food-hock';
import { Dialog, Transition } from '@headlessui/react';
import PriceInput from '../../form/inputs/price-input';
import IconX from '../../Icon/IconX';
import DeleteModal from './DeleteModal';

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
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const { t } = useTranslation();

    const submit = () => {
        if (id) {
            const foodData = {
                id,
                title,
                price,
                image
            }
            // @ts-ignore
            mutate(id, foodData);
            closeModal();
            refreshPage();
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

    const handleOpenDeleteModal = (id?: number) => {
        setIsDeleteModal(prev => !prev);
    };

    const deleteFoodEvent = () => {
        SFoodDelete(id).then(() => {
            refreshPage();
        })
    }

    const refreshPage = () => {
        window.location.reload()
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
                                <div
                                    className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">{t('edit')}</h5>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="text-white-dark hover:text-dark"
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <form className="space-y-5">
                                        <DynamicInput label={t('title')} value={title} isRequired={true}
                                                      updateValue={setTitle} />
                                        <PriceInput label={t('price')} value={price} isRequired={true}
                                                    updateValue={setPrice} />
                                        <DynamicInput label={t('image')} value={image} isRequired={true}
                                                      updateValue={setImage} />
                                    </form>

                                    <div className="flex w-full mt-5 justify-end space-x-4">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleOpenDeleteModal(id)}
                                        >
                                            {t('delete')}
                                        </button>
                                        <button className="btn btn-primary" onClick={submit}>
                                            {isPending ? t('saving') : t('save')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                {
                    isDeleteModal &&
                    <DeleteModal
                        showModal={isDeleteModal}
                        deleteEvent={deleteFoodEvent}
                        closeModal={handleOpenDeleteModal}
                    />
                }
            </Dialog>
        </Transition>
    )
}

export default CreateFoodModal
