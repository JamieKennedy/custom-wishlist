import { FunctionComponent, useState } from "react";

import Modal from "./Modal";

const Footer: FunctionComponent = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const setModalVisibility = (visible: boolean): void => {
        setShowModal(visible);
    };

    return (
        <footer className='absolute bottom-5 left-5'>
            <p className=' text-white'>
                © Jamie Kennedy |{" "}
                <a href='https://github.com/JamieKennedy/custom-wishlist' target='_blank'>
                    GitHub
                </a>{" "}
                | <button onClick={() => setModalVisibility(!showModal)}>Credits</button>
            </p>
            {showModal ? (
                <Modal onClose={() => setModalVisibility(false)}>
                    <p className='py-5 pl-10 text-xl text-white underline'>Credits</p>
                    <p className='pb-5 pl-10 text-white'>
                        Free SVG Background by{" "}
                        <a target='_blank' href='https://bgjar.com'>
                            BGJar
                        </a>
                    </p>
                </Modal>
            ) : null}
        </footer>
    );
};

export default Footer;
