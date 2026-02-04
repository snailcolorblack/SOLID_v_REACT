import {Component} from 'solid-js';
import styles from './App.module.css';
import {Container} from "./layouts/Container/Container";
import {Form} from "./modules/Form/Form";

const App: Component = () => {

    return (
        <main class={styles.main}>
            <Container>
                <h1>Тестовая форма</h1>
                <Form />
            </Container>
        </main>
    );
};

export default App;
