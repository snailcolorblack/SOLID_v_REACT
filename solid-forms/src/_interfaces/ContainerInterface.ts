import {JSX} from "solid-js";

export interface ContainerInterface extends JSX.HTMLAttributes<HTMLDivElement> {
    size?: "TINY" | "SMALL" | "NORMAL" | "LARGE";
}