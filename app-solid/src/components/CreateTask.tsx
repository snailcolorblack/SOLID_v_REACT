import { createSignal, useContext } from 'solid-js';
import { TodoContext } from '../context/TodoContext';
import type {Task} from '../types';

const CreateTask = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error('TodoContext must be used within TodoProvider');
    const { addTask } = context;
    const [title, setTitle] = createSignal<string>('');
    const [description, setDescription] = createSignal<string>('');

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title: title(),
            description: description(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            startedAt: null,
            completedAt: null
        };
        addTask(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} class={'create'} name={'todo-create'} id={'create'}>
            <h2>Создать новую задачу</h2>
            <div class={'create-fields'}>
                <input type="text" value={title()} onInput={(e) => setTitle(e.currentTarget.value)} placeholder="Название" required />
                <textarea value={description()} onInput={(e) => setDescription(e.currentTarget.value)} placeholder="Описание" required />
            </div>
            <button type="submit">Создать</button>
        </form>
    );
};

export default CreateTask;