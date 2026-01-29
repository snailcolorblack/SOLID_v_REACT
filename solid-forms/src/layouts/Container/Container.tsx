import {Component, JSX, splitProps} from "solid-js";
import {ContainerInterface} from "../../_interfaces/ContainerInterface";
import styles from './Container.module.css'

export const Container = (props: ContainerInterface)=> {
    // const [local, rest] = splitProps(mergeProps({ size: "NORMAL" as const }, rawProps), ["size", "class", "classList", "children"]);
    const [local, rest] = splitProps(props, ["size", "class", "classList", "children"]);
    const size = local.size ?? "NORMAL";

    return (
        <div
            class={`${styles.container} ${local.class ?? ""}`.trim()}
            classList={{
                [styles.tiny]:   size === "TINY",
                [styles.small]:  size === "SMALL",
                [styles.normal]: size === "NORMAL",
                [styles.large]:  size === "LARGE",
            }}
            {...rest}
        >
            {local.children}
        </div>
    );
};