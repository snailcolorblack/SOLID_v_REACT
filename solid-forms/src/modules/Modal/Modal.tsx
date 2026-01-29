import {splitProps} from "solid-js";
import {Wrapper} from "../../layouts/Wrapper/Wrapper";
import {ModalInterface} from "../../_interfaces/ModalInterface";
import styles from './Modal.module.css'


export const Modal = (props: ModalInterface) => {
    const [local, rest] = splitProps(props, ["class", "classList"]);

    return (
        <Wrapper as={'dialog'}
                 ref={props.ref}
                 class={`${styles.modal} ${local.class ?? ""}`.trim()}
                 classList={local.classList}
                 {...rest} />
    );
};