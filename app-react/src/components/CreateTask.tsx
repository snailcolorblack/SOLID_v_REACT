import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import type {Task} from '../types';

const CreateTask: React.FC = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error('TodoContext must be used within TodoProvider');
    const { addTask } = context;
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
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
        <>
            <form onSubmit={handleSubmit} className={'create'} name={'todo-create'} id={'create'}>
                <h2>Создать новую задачу</h2>
                <div className={'create-fields'}>
                    <input id={'name'} name={'name'} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" required />
                    <textarea id={'description'} name={'description'} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" required />
                </div>
                <button type="submit">Создать</button>
            </form>
        </>
    );
};

export default CreateTask;