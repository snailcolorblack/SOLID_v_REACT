import {JSX} from "solid-js";

export interface FieldInterface extends JSX.HTMLAttributes<HTMLDivElement>{
    error?: boolean
}