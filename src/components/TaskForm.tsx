import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { Task } from '../types/Task';

interface TaskFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    initialTask?: Task;
}

export const TaskForm: React.FC<TaskFormProps> = ({
    open,
    onClose,
    onSubmit,
    initialTask
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
            setDueDate(initialTask.dueDate || '');
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    }, [initialTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            completed: initialTask ? initialTask.completed : false,
            dueDate: dueDate || null
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {initialTask ? 'Edit Task' : 'Add New Task'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="datetime-local"
                        fullWidth
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        {initialTask ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}; 