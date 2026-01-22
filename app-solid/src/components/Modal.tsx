import { onMount } from 'solid-js';

interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal = (props: ModalProps) => {
    let dialogRef: HTMLDialogElement | null;

    onMount(() => {
        if (dialogRef) {
            dialogRef.showModal();
        }
    });

    const handleConfirm = () => {
        props.onConfirm();
        if (dialogRef) dialogRef.close();
    };

    const handleCancel = () => {
        props.onCancel();
        if (dialogRef) dialogRef.close();
    };

    return (
        <dialog ref={(el) => dialogRef = el} class="modal">
            <p>{props.message}</p>
            <button onClick={handleConfirm}>Да</button>
            <button onClick={handleCancel}>Нет</button>
        </dialog>
    );
};

export default Modal;