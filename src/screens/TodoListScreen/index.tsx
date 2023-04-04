import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import TextFieldCustom from "../../components/TextFieldCustom";
import NewTask from "../../components/NewTask";

const TodoListScreen = () => {
    useEffect(() => {
        const data = localStorage.getItem("todoList")
        console.log("data",data);
        
    }, [])
    return <Container maxWidth={false}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Container>
                    <Box textAlign="center" fontWeight="bold" mb={2} fontSize={20}>New Task</Box>
                    <NewTask />
                </Container>
            </Grid>
            <Grid item xs={12} md={8}>
                <Container>
                    <Box textAlign="center" fontWeight="bold" mb={2} fontSize={20}>To Do List</Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextFieldCustom placeholder="Search ..." />
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    </Container>
}
export default TodoListScreen