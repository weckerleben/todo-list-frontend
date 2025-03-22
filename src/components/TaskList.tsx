import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
    Typography,
    Paper
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Task } from '../types/Task';
import { format } from 'date-fns';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggleComplete,
    onDelete,
    onEdit
}) => {
    return (
        <Paper elevation={2} style={{ marginTop: 20 }}>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id} divider>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => onToggleComplete(task)}
                            color="primary"
                        />
                        <ListItemText
                            primary={
                                <Typography
                                    style={{
                                        textDecoration: task.completed ? 'line-through' : 'none'
                                    }}
                                >
                                    {task.title}
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Typography variant="body2" component="span" color="textSecondary">
                                        {task.description}
                                    </Typography>
                                    {task.dueDate && (
                                        <Typography variant="caption" display="block" color="textSecondary">
                                            Due: {format(new Date(task.dueDate), 'PPP')}
                                        </Typography>
                                    )}
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => onEdit(task)}
                                style={{ marginRight: 8 }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => onDelete(task)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}; 