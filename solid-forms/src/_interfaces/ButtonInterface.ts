import {JSX} from "solid-js";

export interface ButtonInterface extends JSX.ButtonHTMLAttributes<HTMLButtonElement>{
    variant: | 'GREEN' | 'INLINE';
    loading?: boolean;
}