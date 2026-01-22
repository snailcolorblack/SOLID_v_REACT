
export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt: string;
    startedAt: string | null;
    completedAt: string | null;
}