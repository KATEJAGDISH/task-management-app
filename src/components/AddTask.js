import React, { useState } from 'react';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../actions/taskActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddTask = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState(dayjs().add(1, 'day'));
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        const generateId = () => {
            return Math.floor(Math.random() * 1e9).toString(); 
        };
        const newTask = { id: generateId(), title, description, status, date: date.toISOString() };

        dispatch(addTask(newTask));

        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Task added successfully:', data);
            handleClose();
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error adding task:', error);
        });

        setTitle('');
        setDescription('');
        setStatus('');
        setDate(dayjs().add(1, 'day'));
    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}style={{ backgroundColor: '#1F1F1F', color: '#fff' }}>
                Add Task
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAddTask}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Select Date"
                                        value={date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 540 }} size="medium">
                                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={status}
                                        label="Status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"todo"}>Todo</MenuItem>
                                        <MenuItem value={"in-progress"}>In Progress</MenuItem>
                                        <MenuItem value={"done"}>Done</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTask;
