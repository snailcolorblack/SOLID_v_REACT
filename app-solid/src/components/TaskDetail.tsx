import {createSignal, Show, useContext} from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import Modal from './Modal';
import { TodoContext } from '../context/TodoContext';
import type {Task} from '../types';

const TaskDetail = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error('TodoContext must be used within TodoProvider');
    const { tasks, updateTask, deleteTask } = context;
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const id = parseInt(params.id || '0');
    const task = tasks.find(t => t.id === id);
    const [editedTitle, setEditedTitle] = createSignal<string>(task?.title || '');
    const [editedDescription, setEditedDescription] = createSignal<string>(task?.description || '');
    const [editedStatus, setEditedStatus] = createSignal<'pending' | 'in_progress' | 'completed'>(task?.status || 'pending');
    const [showModal, setShowModal] = createSignal<boolean>(false);

    if (!task) return <p>Задача не найдена</p>;

    const handleSave = () => {
        const updated: Task = { ...task, title: editedTitle(), description: editedDescription(), status: editedStatus() };
        if (editedStatus() === 'in_progress' && !task.startedAt) updated.startedAt = new Date().toISOString();
        if (editedStatus() === 'completed' && !task.completedAt) updated.completedAt = new Date().toISOString();
        updateTask(updated);
    };

    const handleDelete = () => {
        deleteTask(task.id);
        navigate('/');
    };

    return (
        <div>
            <h2>Детали задачи</h2>
            <input type="text" value={editedTitle()} onInput={(e) => setEditedTitle(e.currentTarget.value)} />
            <textarea value={editedDescription()} onInput={(e) => setEditedDescription(e.currentTarget.value)} />
            <select value={editedStatus()} onChange={(e) => setEditedStatus(e.currentTarget.value as 'pending' | 'in_progress' | 'completed')}>
                <option value="pending">Ожидание</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Завершено</option>
            </select>
            <button onClick={handleSave}>Сохранить изменения</button>
            <button onClick={() => setShowModal(true)}>Удалить задачу</button>
            <p>Создано: {new Date(task.createdAt).toLocaleString()}</p>
            <Show when={task.startedAt}>
                <p>Принято в работу: {new Date(task.startedAt as string).toLocaleString()}</p>
            </Show>
            <Show when={task.completedAt}>
                <p>Завершено: {new Date(task.completedAt as string).toLocaleString()}</p>
            </Show>

            <Show when={showModal()}>
                <Modal
                    message="Вы уверены, что хотите удалить задачу?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowModal(false)}
                />
            </Show>
        </div>
    );
};

export default TaskDetail;