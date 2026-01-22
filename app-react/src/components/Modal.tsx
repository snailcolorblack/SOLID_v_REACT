import { useRef, useEffect, type FC } from 'react';

interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    const handleConfirm = () => {
        onConfirm();
        if (dialogRef.current) dialogRef.current.close();
    };

    const handleCancel = () => {
        onCancel();
        if (dialogRef.current) dialogRef.current.close();
    };

    return (
        <dialog ref={dialogRef} className="modal">
            <p>{message}</p>
            <div className={'modal-footer'}>
                <button onClick={handleConfirm}>Да</button>
                <button onClick={handleCancel}>Нет</button>
            </div>
        </dialog>
    );
};

export default Modal;