import { FunctionComponent, useState } from "react";

import { FaGithub } from "react-icons/fa";
import Modal from "./Modal";

const Footer: FunctionComponent = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const setModalVisibility = (visible: boolean): void => {
        setShowModal(visible);
    };

    const socialIcons = [
        {
            name: "GitHub",
            href: "https://github.com/JamieKennedy/custom-wishlist",
            icon: (props: any) => <FaGithub {...props} />,
        },
    ];

    return (
        <footer className=''>
            <div className='mx-auto  py-12 px-6 md:flex md:items-center md:justify-between lg:px-8'>
                <div className='flex justify-center space-x-6 md:order-2'>
                    {socialIcons.map((icons) => (
                        <a key={icons.name} href={icons.href} target='_blank' className='text-white hover:text-gray-300'>
                            <span className='sr-only'>{icons.name}</span>
                            <icons.icon className='h-6 w-6' aria-hidden='true' />
                        </a>
                    ))}
                </div>
                <div className='mt-8 md:order-1 md:mt-0'>
                    <p className='text-center text-xs leading-5 text-gray-500'>
                        &copy; {new Date().getFullYear()} Jamie Kennedy. All rights reserved. |{" "}
                        <button onClick={() => setModalVisibility(!showModal)} className='hover:text-gray-300'>
                            Credits
                        </button>
                    </p>
                </div>
            </div>
            <Modal
                visible={showModal}
                setVisible={setShowModal}
                header='Credits'
                body={
                    <p>
                        Free SVG Background by{" "}
                        <a target='_blank' href='https://bgjar.com'>
                            BGJar
                        </a>
                    </p>
                }
            />
        </footer>
    );

    return (
        <footer className='ml-5 mb-5'>
            <p className=' text-white'>
                © Jamie Kennedy |{" "}
                <a href='https://github.com/JamieKennedy/custom-wishlist' target='_blank'>
                    GitHub
                </a>{" "}
                | <button onClick={() => setModalVisibility(!showModal)}>Credits</button>
            </p>
        </footer>
    );
};

export default Footer;
