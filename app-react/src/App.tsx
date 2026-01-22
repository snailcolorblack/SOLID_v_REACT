import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import TaskDetail from './components/TaskDetail';
import { TodoProvider } from './context/TodoContext';
import './App.css'

function App() {
    const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');

    return (
        <main>
            <TodoProvider>
                <Router>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <div className="tabs">
                                        <button onClick={() => setActiveTab('list')} className={activeTab === 'list' ? 'active' : ''}>Список задач</button>
                                        <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>Создать задачу</button>
                                    </div>
                                    {activeTab === 'list' ? <TaskList /> : <CreateTask />}
                                </>
                            } />
                            <Route path="/task/:id" element={<TaskDetail />} />
                        </Routes>
                </Router>
            </TodoProvider>
        </main>
    );
}

export default App;