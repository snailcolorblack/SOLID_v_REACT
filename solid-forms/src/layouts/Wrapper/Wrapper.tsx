import { Dynamic } from "solid-js/web";
import {ComponentProps, splitProps} from "solid-js";
import {ElementType, WrapperInterface} from "../../_interfaces/WrapperInterface";
import styles from './Wrapper.module.css'


export const Wrapper = <T extends ElementType = "div">(props: WrapperInterface<T> & Omit<ComponentProps<T>, keyof WrapperInterface<T>>) => {
    const [local, rest] = splitProps(props, ["as", "class"]);

    return <Dynamic component={local.as ?? "div"}  class={`${styles.wrapper} ${local.class ?? ''}`.trim()} {...rest} />
};