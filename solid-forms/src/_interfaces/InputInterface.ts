import {JSX} from "solid-js";
import {FieldInterface} from "./FieldInterface";

export interface InputInterface extends FieldInterface {
    inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: JSX.LabelHTMLAttributes<HTMLLabelElement>;

    label?: string;
    formatting?: RegExp;
}