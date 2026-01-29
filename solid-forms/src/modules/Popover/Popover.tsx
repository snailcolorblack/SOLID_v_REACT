import {splitProps} from "solid-js";
import {PopoverInterface} from "../../_interfaces/PopoverInterface";
import styles from './Popover.module.css'

export const Popover = (props: PopoverInterface) => {
    const [local, rest] = splitProps(props, ["class", "classList"]);

    return (
        <div
            class={`${styles.popover} ${local.class ?? ""}`.trim()}
            classList={local.classList}
            {...rest}
        />
    );
};