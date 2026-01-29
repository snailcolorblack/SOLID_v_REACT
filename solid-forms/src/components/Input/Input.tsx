import {createSignal, createUniqueId, JSX, mergeProps, splitProps} from "solid-js";
import {Field} from "../../layouts/Field/Field";
import {InputInterface} from "../../_interfaces/InputInterface";
import styles from './Input.module.css'

export const Input = (props: InputInterface) => {
    const [local, rest] = splitProps(mergeProps({ labelProps:{} as JSX.LabelHTMLAttributes<HTMLLabelElement>, inputProps:{} as JSX.InputHTMLAttributes<HTMLInputElement> }, props), ['class', 'error']);
    const labelProps = rest.labelProps
    const inputProps = rest.inputProps

    const id = inputProps.id ?? createUniqueId()
    const name = inputProps.name ?? id

    const [rawValue, setRawValue] = createSignal(inputProps.value)
    const [visibleValue, setVisibleValue] = createSignal(inputProps.value)





    return (
        <Field error={local?.error}>
            <div class={`${styles.input} ${local.class ?? ''}`.trim()}>
                <label for={id} id={`label-${id}`}>{rest.label ?? inputProps.placeholder ?? ''.trim()}</label>
                <input id={id} name={name} placeholder={''} value={visibleValue()}{...inputProps}/>
            </div>
            <input type="hidden" name={name} value={rawValue()} readOnly />
        </Field>
    )
}