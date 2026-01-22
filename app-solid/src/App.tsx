import { createSignal, type JSX } from 'solid-js';
import { Dynamic } from "solid-js/web";
import { Router, Route, type RouteSectionProps } from '@solidjs/router';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import TaskDetail from './components/TaskDetail';
import { TodoProvider } from './context/TodoContext';
import './App.css'



function AppLayout(props: RouteSectionProps) {
    return (
        <main>
            <TodoProvider>
                    {props.children}
            </TodoProvider>
        </main>
    );
}

const App = () => {
    const [activeTab, setActiveTab] = createSignal<'list' | 'create'>('list');

    const tabs: Record<'list' | 'create', () => JSX.Element> = {
        list: TaskList,
        create: CreateTask
    };

    return (
        <Router root={AppLayout}>
            <Route path="/" component={() => (
                <>
                    <div class="tabs">
                        <button
                            onClick={() => setActiveTab('list')}
                            classList={{'active': activeTab() === 'list'}}
                        >
                            Список задач
                        </button>

                        <button
                            onClick={() => setActiveTab('create')}
                            classList={{'active': activeTab() === 'create'}}
                        >
                            Создать задачу
                        </button>
                    </div>
                    <div class="tab-content">
                        <Dynamic component={tabs[activeTab()]}/>
                    </div>
                </>
            )}/>
            <Route path="/task/:id" component={TaskDetail}/>
        </Router>
    );
}

export default App;