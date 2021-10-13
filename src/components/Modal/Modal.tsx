
import { useState } from "react";
import { Button, Text, InputField, ModalTitle, Modal as UIModal } from "@taraxa_project/taraxa-ui";
import CloseIcon from '../../assets/icons/close';



type ModalProps = {
    title: string,
    onClose: () => void,
    content?: JSX.Element,
}

const Modal = ({ title, onClose, content }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(true);
    content = (<>
        <ModalTitle title={title} />
        {content}
    </>)

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
        onClose();
    }

    return (
        <UIModal
            children={content!}
            show={isOpen}
            parentElementID='root'
            closeIcon={CloseIcon}
            title={title}
            onRequestClose={closeModal}
        />
    )
}

export default Modal;
