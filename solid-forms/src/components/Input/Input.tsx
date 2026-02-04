import {createEffect, createSignal, createUniqueId, JSX, mergeProps, splitProps} from "solid-js";
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
        ["class", "error", "label", "formatting"]
    );
    const inputProps = rest.inputProps;

    const id = inputProps.id ?? createUniqueId();
    const name = inputProps.name ?? id;

    const isControlled = () => inputProps.value !== undefined;
    const [visibleValue, setVisibleValue] = createSignal<string>("");

    const formatForRaw = (value: string): string => {
        if (!local.formatting) return value;
        return value.replace(local.formatting, "");
    };


    const formatForDisplay = (value: string): string => {
        // if (!local.mask) return value;
        // return maskFormatter(local.mask, value)
        return value
    };

    const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
        if (inputProps.readOnly || inputProps.disabled) return;

        const input = e.currentTarget;
        const enteredValue = input.value;

        const cleaned = formatForRaw(enteredValue);
        const display = formatForDisplay(cleaned);

        setVisibleValue(display);
        if (inputProps.onInput) {
            const syntheticEvent = {
                ...e,
                currentTarget: {
                    ...input,
                    value: cleaned,
                    name: name,
                },
                target: {
                    ...input,
                    value: cleaned,
                    name: name,
                },
            } as typeof e;

            inputProps.onInput(syntheticEvent);
        }
    };

    createEffect(() => {
        if (isControlled()) {
            const external = String(inputProps.value ?? "");
            const cleaned = formatForRaw(external);
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
                    {...inputProps}
                    id={id}
                    value={visibleValue()}
                    placeholder={inputProps.placeholder ?? ""}
                    onInput={handleInput}
                    type={inputProps.type ?? (local.formatting ? "text" : inputProps.type ?? "text")}
                />
            </div>
        </Field>
    );
};