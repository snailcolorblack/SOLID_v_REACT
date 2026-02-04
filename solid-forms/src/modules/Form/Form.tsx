import {JSX} from "solid-js";
import {Wrapper} from "../../layouts/Wrapper/Wrapper";
import {Input} from "../../components/Input/Input";
import styles from './Form.module.css'
import {Button} from "../../components/Button/Button";

export const Form = () => {
    const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };


    return (
        <Wrapper as={'form'} onSubmit={handleSubmit} class={styles.form}>
            <div class={styles.form__fields}>
                <Input
                    label="Тестовый без букв"
                    formatting={/\D/g}
                    inputProps={{
                        name: "test-input-number",
                        id: "test-id-1",
                    }}
                />
                <Input
                    label="Тестовый инпут"
                    inputProps={{
                        name: "test-input",
                        id: "test-id-2",
                    }}
                />
            </div>
            <Button type={'submit'}>Отправить!</Button>
        </Wrapper>
    )
}