import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useState } from "react";

interface IModelProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    buttons?: IModalButton[];
    header: string;
    body: ReactNode;
    icon?: ReactNode;
}

interface IModalButton {
    text: string;
    closeOnClick: boolean;
    className: string;
}

const Modal = ({ visible, setVisible, buttons, header, body, icon }: IModelProps) => {
    return (
        <Transition.Root show={visible} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setVisible}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-opacity-0 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-slate-500/20 px-4 pt-5 pb-4 text-left shadow-xl backdrop-blur-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                                <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                                    <button
                                        type='button'
                                        className='rounded-md  text-white focus:outline-none  hover:text-gray-300'
                                        onClick={() => setVisible(false)}
                                    >
                                        <span className='sr-only'>Close</span>
                                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                    </button>
                                </div>
                                <div className='sm:flex sm:items-start'>
                                    {icon ? (
                                        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                            {icon}
                                        </div>
                                    ) : null}
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-white'>
                                            {header}
                                        </Dialog.Title>
                                        <div className='mt-2'>
                                            <p className='text-sm text-white'>{body}</p>
                                        </div>
                                    </div>
                                </div>
                                {buttons && buttons.length > 0 ? (
                                    <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                                        {buttons.map((button) => {
                                            return (
                                                <button
                                                    type='button'
                                                    className={`inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto ${button.className}`}
                                                    onClick={() => setVisible(button.closeOnClick)}
                                                >
                                                    {button.text}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : null}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
