import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import MiniDrawer from '../MiniDrawer';

const AllTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
            });
    }, []);

    return (
        <Box p={3} ml={12}>
            <Box mb={3}>
                <MiniDrawer />
            </Box>
            <Typography variant="h4" gutterBottom >
                All Tasks
            </Typography>
            <Grid container spacing={3}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Card>
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
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AllTask;
