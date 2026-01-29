import {splitProps} from "solid-js";
import {FieldInterface} from "../../_interfaces/FieldInterface";
import styles from './Field.module.css'

export const Field = (props: FieldInterface) => {
    const [local, rest] = splitProps(props, ['class', 'error']);
    let fieldRef: HTMLDivElement | undefined;

    const handleFieldClick = () => {
        if (!fieldRef) return;
        fieldRef.querySelector<HTMLInputElement | HTMLTextAreaElement >("input:not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea")?.focus();
    };

    return (
        <div ref={fieldRef}
             onClick={handleFieldClick}
             class={`${styles.field} ${local.class ?? ''}`.trim()}
             classList={{[styles.error]: local.error}}
             aria-invalid={!!local.error}
             {...rest}
        />
    )
}