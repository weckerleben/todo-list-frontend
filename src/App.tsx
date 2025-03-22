import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Tab,
    Tabs,
    AppBar,
    Toolbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { Task } from './types/Task';
import { api } from './services/api';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();
    const [tabValue, setTabValue] = useState(0);

    const fetchTasks = async () => {
        try {
            const tasks = await api.getAllTasks();
            setTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
        try {
            await api.createTask({
                ...taskData,
                createdAt: new Date().toISOString()
            });
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleEditTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
        if (!editingTask) return;
        try {
            await api.updateTask(editingTask.id!, {
                ...editingTask,
                ...taskData
            });
            setEditingTask(undefined);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (task: Task) => {
        try {
            await api.deleteTask(task.id!);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            await api.toggleTaskStatus(task.id!);
            fetchTasks();
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    };

    const filteredTasks = tasks.filter(task => 
        tabValue === 0 ? !task.completed : task.completed
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo List
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="md">
                <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                            <Tab label="Pending" />
                            <Tab label="Completed" />
                        </Tabs>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setEditingTask(undefined);
                                setIsFormOpen(true);
                            }}
                        >
                            Add Task
                        </Button>
                    </Box>

                    <TaskList
                        tasks={filteredTasks}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDeleteTask}
                        onEdit={(task) => {
                            setEditingTask(task);
                            setIsFormOpen(true);
                        }}
                    />

                    <TaskForm
                        open={isFormOpen}
                        onClose={() => {
                            setIsFormOpen(false);
                            setEditingTask(undefined);
                        }}
                        onSubmit={editingTask ? handleEditTask : handleAddTask}
                        initialTask={editingTask}
                    />
                </Box>
            </Container>
        </>
    );
}

export default App;
