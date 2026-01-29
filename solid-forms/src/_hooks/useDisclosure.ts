import { createSignal } from "solid-js";

export function useDisclosure(initial = false) {
    const [isOpen, setIsOpen] = createSignal(initial);

    return {
        isOpen,
        open:   () => setIsOpen(true),
        close:  () => setIsOpen(false),
        toggle: () => setIsOpen(v => !v),
    } as const;
}