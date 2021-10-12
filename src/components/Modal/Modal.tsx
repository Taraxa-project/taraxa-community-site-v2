
import { useState } from "react";
import { Button, Text, InputField, ModalTitle, Modal as UIModal } from "@taraxa_project/taraxa-ui";
import { JsxElement } from "typescript";
import CloseIcon from '../../assets/icons/close';



type ModalProps = {
    title: string,
    onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    content?: JsxElement,
}

const Modal = ({ title, onClose, content }: ModalProps) => {
    const children = <div></div>
    const [isOpen, setIsOpen] = useState(false);

    return (
        <UIModal
            children={children}
            show={isOpen}
            parentElementID='baseModal'
            closeIcon={CloseIcon}
            title={title}
            onRequestClose={onClose}
        />
    )
}

export default Modal;
