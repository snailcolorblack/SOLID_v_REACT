import {Component, JSX} from "solid-js";

export type ElementType = keyof JSX.IntrinsicElements | Component<any>;

export type WrapperInterface<T extends ElementType = "div"> = {
    as?: T;
    class?: string;
    children?: JSX.Element;
};