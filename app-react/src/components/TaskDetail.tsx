import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { TodoContext } from '../context/TodoContext';
import type {Task} from '../types';

const TaskDetail: React.FC = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error('TodoContext must be used within TodoProvider');
    const { tasks, updateTask, deleteTask } = context;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const task = tasks.find(t => t.id === parseInt(id || '0'));
    const [editedTitle, setEditedTitle] = useState<string>(task?.title || '');
    const [editedDescription, setEditedDescription] = useState<string>(task?.description || '');
    const [editedStatus, setEditedStatus] = useState<'pending' | 'in_progress' | 'completed'>(task?.status || 'pending');
    const [showModal, setShowModal] = useState<boolean>(false);

    if (!task) return <p>Задача не найдена</p>;

    const handleSave = () => {
        const updated: Task = { ...task, title: editedTitle, description: editedDescription, status: editedStatus };
        if (editedStatus === 'in_progress' && !task.startedAt) updated.startedAt = new Date().toISOString();
        if (editedStatus === 'completed' && !task.completedAt) updated.completedAt = new Date().toISOString();
        updateTask(updated);
    };

    const handleDelete = () => {
        deleteTask(task.id);
        navigate('/');
    };

    return (
        <div className={'todo'}>
            <a href={'/'}>Назад</a>
            <h2>Детали задачи</h2>
            <div className={'todo-description'}>
                <input id={'name'} name={'todo-name'} placeholder={'Наименование'} type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                <textarea id={'description'} name={'todo-description'} placeholder={'Описание'} value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                <select id={'state'} name={'todo-state'} value={editedStatus} onChange={(e) => setEditedStatus(e.target.value as 'pending' | 'in_progress' | 'completed')}>
                    <option value="pending">Ожидание</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Завершено</option>
                </select>
            </div>
            <div className={'todo-actions'}>
                <button onClick={handleSave}>Сохранить изменения</button>
                <button onClick={() => setShowModal(true)}>Удалить задачу</button>
            </div>
            <div className={'todo-footer'}>
                <p>Создано: {new Date(task.createdAt).toLocaleString()}</p>
                {task.startedAt && <p>Принято в работу: {new Date(task.startedAt).toLocaleString()}</p>}
                {task.completedAt && <p>Завершено: {new Date(task.completedAt).toLocaleString()}</p>}
            </div>




            {showModal && (
                <Modal
                    message="Вы уверены, что хотите удалить задачу?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default TaskDetail;