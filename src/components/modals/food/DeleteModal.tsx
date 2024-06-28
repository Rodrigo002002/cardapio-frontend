import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../Icon/IconX';
import { useTranslation } from 'react-i18next';
import IconExclamationMark from '../../Icon/IconExclamationMark';

interface ModalProps {
    showModal: boolean,
    deleteEvent(): void,
    closeModal(): void
}

const DeleteModal = ({showModal, closeModal, deleteEvent}: ModalProps) => {
    const { t, i18n } = useTranslation();

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
                            <Dialog.Panel as="div"
                                          className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                <div
                                    className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">{t('delete')}</h5>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="text-white-dark hover:text-dark"
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <label className="text-center text-white-dark">{t('messages.delete')}</label>
                                    <div className="flex justify-center mt-5">
                                        <IconExclamationMark
                                            className="min-w-[150px] min-h-[150px] text-danger"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full mt-5 justify-center space-x-4 mb-7">
                                    <button className="btn btn-primary" onClick={closeModal}>
                                        {t('cancel')}
                                    </button>
                                    <button className="btn btn-danger" onClick={deleteEvent}>
                                        {t('delete')}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default DeleteModal
