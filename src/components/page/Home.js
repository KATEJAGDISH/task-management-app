import React from 'react';
import MiniDrawer from '../MiniDrawer';
import { Typography, Container, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const Home = () => {
    return (
        <Container maxWidth="md" >
            <div>
                <MiniDrawer />
            </div>

            <Typography variant="h4" align="center" gutterBottom>
                My Task Manager
            </Typography>
            <Typography variant="body1" align="center" paragraph>
                Welcome to My Task Manager! Here you can manage all your tasks efficiently.
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/board"
                        sx={{backgroundColor:'#1F1F1F'}}
                    >
                        View Tasks
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
