import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import MiniDrawer from '../MiniDrawer';

const OverdueTasks = () => {
    const [overdueTasks, setOverdueTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then((res) => res.json())
            .then((data) => {
                // Filter tasks to include only overdue tasks
                const filteredTasks = data.filter(task => task.status === 'overdue');
                setOverdueTasks(filteredTasks);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
            });
    }, []);

    return (
        <Box p={3} marginLeft={12}>
            <div>
                <MiniDrawer/>
            </div>
            <Typography variant="h4" gutterBottom>
                Overdue Tasks
            </Typography>
            <Grid container spacing={3}>
                {overdueTasks.map((task) => (
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

export default OverdueTasks;
