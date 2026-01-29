import {Component} from 'solid-js';
import styles from './App.module.css';
import {Container} from "./layouts/Container/Container";
import {Input} from "./components/Input/Input";

const App: Component = () => {

  return (
    <main class={styles.main}>
        <Container>
            <h1>Тестовая форма</h1>
            <Input inputProps={{
                value: 0,
                name: 'test-input',
                id: 'test-id'
            }}/>
        </Container>
    </main>
  );
};

export default App;
