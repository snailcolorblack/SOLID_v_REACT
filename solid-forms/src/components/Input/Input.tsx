import {createEffect, createSignal, createUniqueId, JSX, mergeProps, on, splitProps} from "solid-js";
import {Field} from "../../layouts/Field/Field";
import {InputInterface} from "../../_interfaces/InputInterface";
import styles from './Input.module.css'

export const Input = (props: InputInterface) => {
    const [local, rest] = splitProps(
        mergeProps(
            {
                labelProps: {} as JSX.LabelHTMLAttributes<HTMLLabelElement>,
                inputProps: {} as JSX.InputHTMLAttributes<HTMLInputElement>,
            },
            props
        ),
        ["class", "error", "label", "formatting", "onChange", "onInput"]
    );

    const inputProps = rest.inputProps;

    const id = inputProps.id ?? createUniqueId();
    const name = inputProps.name ?? id;

    const isControlled = () => inputProps.value !== undefined;

    const [rawValue, setRawValue] = createSignal<string>("");
    const [visibleValue, setVisibleValue] = createSignal<string>("");


    const formatForRaw = (value: string): string => {
        if (!local.formatting) return value;
        return value.replace(local.formatting, "");
    };

    const formatForDisplay = (value: string): string => {
        // if (!local.mask) return value;
        // return maskFormatter(local.mask, value)


        // Пока нет маски
        return value
    };

    const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
        if (inputProps.readOnly || inputProps.disabled) return;

        let {value, name} = e.currentTarget
        const cleaned = formatForRaw(value);
        const display = formatForDisplay(cleaned);
        value = cleaned


        setRawValue(cleaned);
        setVisibleValue(display);

        console.log({ value, cleaned, display });
    };


    createEffect(() => {
        if (isControlled()) {
            const external = String(inputProps.value ?? "");
            const cleaned = formatForRaw(external);

            setRawValue(cleaned);
            setVisibleValue(formatForDisplay(cleaned));
        }
    });


    return (
        <Field error={local.error}>
            <div class={`${styles.input} ${local.class ?? ""}`.trim()}>
                {(local.label || inputProps.placeholder) && (
                    <label for={id} id={`label-${id}`}>
                        {local.label ?? inputProps.placeholder}
                    </label>
                )}

                <input
                    id={id}
                    name={name}
                    placeholder={inputProps.placeholder ?? ""}
                    value={visibleValue()}
                    onInput={handleInput}
                    {...inputProps}
                    type={local.formatting ? "text" : inputProps.type ?? "text"}
                />
                <input type="hidden" name={name} value={rawValue()} readOnly />
            </div>
        </Field>
    );
};