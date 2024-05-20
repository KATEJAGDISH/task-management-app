import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTasksSuccess, updateTaskSuccess, deleteTaskSuccess } from '../actions/taskActions';
import { Grid, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField, Card, CardContent, } from '@mui/material';
import MiniDrawer from './MiniDrawer';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './DragDropExample.css';

const DragDropExample = ({ tasks, fetchTasksSuccess, updateTaskSuccess, deleteTaskSuccess }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then((res) => res.json())
            .then((data) => {
                const updatedTasks = data.map(task => {
                    if (new Date(task.date) < new Date() && task.status !== 'overdue') {
                        task.status = 'overdue';
                    }
                    return task;
                });
                fetchTasksSuccess(updatedTasks);
            })
            .catch((err) => {
                console.error("err", err);
                if (!sessionStorage.getItem("showError")) {
                    const ok = window.confirm(
                        "Make sure to run the JSON server by running 'json-server src/tasks.json --port 3001'"
                    );
                    if (ok) {
                        window.location.reload();
                        sessionStorage.setItem("showError", "true");
                    }
                }
            });
    }, [fetchTasksSuccess]);
    const updateTask = (task) => {
        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
        .then(() => {
            console.log("Task updated:", task);
            updateTaskSuccess(task);
        })
        .catch((error) => {
            console.error("Error updating task:", error);
        });
    };
    

    const deleteTask = (taskId) => {
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: "DELETE",
        })
        .then(() => deleteTaskSuccess(taskId));
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("text/plain", taskId.toString());
    };

    const handleDragEnd = (e) => {
        e.dataTransfer.clearData();
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");

        const task = tasks?.find((task) => task.id.toString() === taskId);

        if (task) {
            task.status = status;
            updateTask(task);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setEditedTask({ ...task });
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleEditChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

   

    const handleSave = () => {
        updateTask(editedTask);
        setDialogOpen(false);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteTask(selectedTask.id);
        setDeleteDialogOpen(false);
        // Update task status to "delete"
        setSelectedTask({ ...selectedTask, status: "delete" });
        updateTask({ ...selectedTask, status: "delete" });
    };

    const renderTasks = (status) => {
        return tasks
            ?.filter((task) => task.status === status)
            .map((task) => (
<Card
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragEnd={handleDragEnd}
            onClick={() => handleTaskClick(task)}
            sx={{
                backgroundColor: '#FFFFFF',
                marginBottom: 2,
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="h6" component="div">
                        Task: {task.title}
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Description: {task.description}
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="body2" sx={{ color: 'primary.main' }}>
                        Status: {task.status}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" sx={{ color: 'error.main' }}>
                        Due Date: {task.date}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
            ));
    };

    return (
        <Box className="container"><div>
        <MiniDrawer/></div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="h6" align="center" color="textPrimary">Todo</Typography>
                    <div className="status-box" onDrop={(e) => handleDrop(e, "todo")} onDragOver={handleDragOver} >
                        {renderTasks("todo")}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" align="center" color="textPrimary">In Progress</Typography>
                    <div className="status-box" onDrop={(e) => handleDrop(e, "in-progress")} onDragOver={handleDragOver}>
                        {renderTasks("in-progress")}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" align="center" color="textPrimary">Done</Typography>
                    <div className="status-box" onDrop={(e) => handleDrop(e, "done")} onDragOver={handleDragOver}>
                        {renderTasks("done")}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" align="center" color="textPrimary">Overdue</Typography>
                    <div className="status-box" onDrop={(e) => handleDrop(e, "overdue")} onDragOver={handleDragOver}>
                        {renderTasks("overdue")}
                    </div>
                </Grid>
            </Grid>

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>
                    {selectedTask ? selectedTask.title : ''}
                    <IconButton onClick={handleDelete} style={{ float: 'right' }}>
                        <DeleteIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        name="title"
                        label="Title"
                        value={editedTask.title || ''}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl sx={{ m: 1, minWidth: 536 }} size="medium">
                        <InputLabel id="demo-select-small-label">Status</InputLabel>
                        <Select
                            name="status"
                            label="Status"
                            value={editedTask.status || ''}
                            onChange={handleEditChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value={"todo"}>Todo</MenuItem>
                            <MenuItem value={"in-progress"}>In Progress</MenuItem>
                            <MenuItem value={"done"}>Done</MenuItem>
                            <MenuItem value={"overdue"}>Overdue</MenuItem>
                        </Select>
                    </FormControl>
                
                    <TextField
                        name="description"
                        label="Description"
                        value={editedTask.description || ''}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation dialog for delete action */}
            <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { fetchTasksSuccess, updateTaskSuccess, deleteTaskSuccess })(DragDropExample);
