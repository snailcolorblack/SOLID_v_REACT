import {splitProps} from "solid-js";
import {ButtonInterface} from "../../_interfaces/ButtonInterface";
import styles from './Button.module.css'

export const Button = (props: ButtonInterface) => {
    const [local, rest] = splitProps(props, ["class", 'loading', 'variant', 'children', 'disabled']);
    const disabled = local.disabled || local.loading

    return (
        <button
            disabled={disabled}
            class={`${styles.button} ${local.class ?? ''}`.trim()}
            classList={{
                [styles.green]: local.variant === 'GREEN',
                [styles.inline]: local.variant === 'INLINE',
            }}
            {...rest}
        >
            {local.loading
                ? <span>Загрузка...</span>
                : local.children
            }
        </button>
    )
}