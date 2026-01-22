import {createContext, createEffect, type JSXElement, onMount} from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import type {Task} from '../types';

interface TodoContextType {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: number) => void;
    deleteSelected: (selectedIds: number[]) => void;
    changeStatusSelected: (selectedIds: number[], newStatus: 'pending' | 'in_progress' | 'completed') => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = (props: { children: JSXElement }) => {
    const [tasks, setTasks] = createStore<Task[]>([]);

    onMount(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
        if (storedTasks.length === 0) {
            const defaultTasks: Task[] = [
                {
                    id: Date.now() + 1,
                    title: 'Задача 1',
                    description: 'Описание первой задачи',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    startedAt: null,
                    completedAt: null
                },
                {
                    id: Date.now() + 2,
                    title: 'Задача 2',
                    description: 'Описание второй задачи',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    startedAt: null,
                    completedAt: null
                }
            ];
            setTasks(defaultTasks);
        } else {
            setTasks(storedTasks);
        }
    });

    createEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    const addTask = (newTask: Task) => {
        setTasks(tasks.length, newTask);
    };

    const updateTask = (updatedTask: Task) => {
        const index = tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
            setTasks(index, updatedTask);
        }
    };

    const deleteTask = (id: number) => {
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            setTasks(produce((draft) => {
                draft.splice(index, 1);
            }));
        }
    };

    const deleteSelected = (selectedIds: number[]) => {
        setTasks(produce((draft) => {
            for (let i = draft.length - 1; i >= 0; i--) {
                if (selectedIds.includes(draft[i].id)) {
                    draft.splice(i, 1);
                }
            }
        }));
    };

    const changeStatusSelected = (selectedIds: number[], newStatus: 'pending' | 'in_progress' | 'completed') => {
        for (const id of selectedIds) {
            const index = tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                const currentTask = tasks[index];
                setTasks(index, {
                    status: newStatus,
                    startedAt: newStatus === 'in_progress' && !currentTask.startedAt ? new Date().toISOString() : currentTask.startedAt,
                    completedAt: newStatus === 'completed' && !currentTask.completedAt ? new Date().toISOString() : currentTask.completedAt
                });
            }
        }
    };

    return (
        <TodoContext.Provider value={{ tasks, addTask, updateTask, deleteTask, deleteSelected, changeStatusSelected }}>
            {props.children}
        </TodoContext.Provider>
    );
};