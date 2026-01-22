import React, { createContext, useState, useEffect, type ReactNode} from 'react';
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

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (newTask: Task) => {
        setTasks([...tasks, newTask]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const deleteSelected = (selectedIds: number[]) => {
        setTasks(tasks.filter(task => !selectedIds.includes(task.id)));
    };

    const changeStatusSelected = (selectedIds: number[], newStatus: 'pending' | 'in_progress' | 'completed') => {
        setTasks(tasks.map(task => {
            if (selectedIds.includes(task.id)) {
                const updated: Task = { ...task, status: newStatus };
                if (newStatus === 'in_progress' && !task.startedAt) updated.startedAt = new Date().toISOString();
                if (newStatus === 'completed' && !task.completedAt) updated.completedAt = new Date().toISOString();
                return updated;
            }
            return task;
        }));
    };

    return (
        <TodoContext.Provider value={{ tasks, addTask, updateTask, deleteTask, deleteSelected, changeStatusSelected }}>
            {children}
        </TodoContext.Provider>
    );
};