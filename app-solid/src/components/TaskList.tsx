import {createSignal, useContext, For, Show, createEffect} from 'solid-js';
import { A } from '@solidjs/router';
import { TodoContext } from '../context/TodoContext';
import type { Task } from '../types';
import Modal from "./Modal";

const TaskList = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error('TodoContext must be used within TodoProvider');
    const { tasks, deleteTask, updateTask, deleteSelected, changeStatusSelected } = context;
    const [selectedIds, setSelectedIds] = createSignal<number[]>([]);
    const [bulkStatus, setBulkStatus] = createSignal<'pending' | 'in_progress' | 'completed'>('pending');
    const [showModal, setShowModal] = createSignal<boolean>(false);
    const [deleteAction, setDeleteAction] = createSignal<'single' | 'bulk' | null>(null);
    const [deleteId, setDeleteId] = createSignal<number | null>(null);

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleBulkDeleteClick = () => {
        if (selectedIds().length > 0) {
            setDeleteAction('bulk');
            setShowModal(true);
        }
    };

    const handleSingleStatusChange = (id: number, newStatus: 'pending' | 'in_progress' | 'completed') => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const updated: Task = { ...task, status: newStatus };
            if (newStatus === 'in_progress' && !task.startedAt) updated.startedAt = new Date().toISOString();
            if (newStatus === 'completed' && !task.completedAt) updated.completedAt = new Date().toISOString();
            updateTask(updated);
        }
    };

    const handleDelete = () => {
        if (deleteAction() === 'single' && deleteId() !== null) {
            deleteTask(deleteId()!);
        } else if (deleteAction() === 'bulk') {
            deleteSelected(selectedIds());
            setSelectedIds([]);
        }
        setShowModal(false);
        setDeleteAction(null);
        setDeleteId(null);
    };

    createEffect(()=> {
        if (selectedIds.length > 0) {
            changeStatusSelected(selectedIds(), bulkStatus());
            setSelectedIds([]);
        }
    })

    return (
        <>
            <div class="todos">
                <h2>Список задач</h2>
                <div class="bulk-actions">
                    <button onClick={handleBulkDeleteClick}>Удалить выбранные</button>
                    <select name="change-statuses" value={bulkStatus()}
                            onChange={(e) => setBulkStatus(e.currentTarget.value as 'pending' | 'in_progress' | 'completed')}>
                        <option value="pending">Ожидание</option>
                        <option value="in_progress">В работе</option>
                        <option value="completed">Завершено</option>
                    </select>
                </div>
                <ul>
                    <For each={tasks}>
                        {(task) => (
                            <li>
                                <input name="todo" id={`${task.id}-id`} type="checkbox"
                                       checked={selectedIds().includes(task.id)}
                                       onChange={() => toggleSelect(task.id)}/>
                                <label for={`${task.id}-id`}>
                                    <div class="todo-header">
                                        <A href={`/task/${task.id}`}>{task.title}</A>
                                        <select id={`state${task.id}`} name="state" value={task.status}
                                                onChange={(e) => handleSingleStatusChange(task.id, e.currentTarget.value as 'pending' | 'in_progress' | 'completed')}>
                                            <option value="pending">Ожидание</option>
                                            <option value="in_progress">В работе</option>
                                            <option value="completed">Завершено</option>
                                        </select>
                                    </div>
                                    <div class="todo-buttons">
                                        <button onClick={() => {
                                            setDeleteId(task.id);
                                            setDeleteAction('single');
                                            setShowModal(true);
                                        }}>Удалить
                                        </button>
                                    </div>
                                </label>
                            </li>
                        )}
                    </For>
                </ul>
            </div>

            <Show when={showModal()}>
                <Modal
                    message={deleteAction() === 'bulk' ? "Вы уверены, что хотите удалить выбранные задачи?" : "Вы уверены, что хотите удалить задачу?"}
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setShowModal(false);
                        setDeleteAction(null);
                        setDeleteId(null);
                    }}
                />
            </Show>
        </>
    );
};

export default TaskList;