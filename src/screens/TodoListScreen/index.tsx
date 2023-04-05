import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import moment from "moment";
import TextFieldCustom from "../../components/TextFieldCustom";
import NewTask from "../../components/NewTask";
import { TaskModel } from "./todo-list.model";

const TodoListScreen = () => {
  const [todoList, setTodoList] = useState<Array<TaskModel>>([]);
  const [todoListTemp, setTodoListTemp] = useState<Array<TaskModel>>([]);
  const [hideGroups, setHideGroups] = useState<Array<number>>([]);
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const onGetTodoList = () => {
    const data = localStorage.getItem("todoList");
    if (!!data) {
      const dataParse: Array<TaskModel> = JSON.parse(data);
      dataParse.sort(
        (a: TaskModel, b: TaskModel) =>
          moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf()
      );
      setTodoList(dataParse);
      setTodoListTemp(dataParse);
    }
  };

  const handleClick = (index: number) => {
    let idxOfExpandGroups = hideGroups.indexOf(index);
    if (idxOfExpandGroups >= 0) {
      hideGroups.splice(idxOfExpandGroups, 1);
    } else {
      hideGroups.push(index);
    }
    setHideGroups([...hideGroups]);
  };
  const handleClickChecked = (data: TaskModel, checked: boolean) => {
    const checkedListTemp = [...checkedList];
    let idCheckbox = checkedListTemp.findIndex((check) => check === data?.id);
    if (!checked) {
      checkedListTemp.splice(idCheckbox, 1);
    } else {
      checkedListTemp.push(data.id as string);
    }
    setCheckedList([...checkedListTemp]);
  };

  const handleRemove = (data: TaskModel) => {
    const newList = todoList.filter(
      (todo: TaskModel, index: number) => todo.id !== data.id
    );
    setTodoList(newList);
    localStorage.setItem("todoList", JSON.stringify(newList));
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (!value) {
      setTodoList(todoListTemp);
    } else {
      const newData = todoListTemp.filter(
        (todo) =>
          todo.taskTitle.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setTodoList(newData);
    }
  };

  const handleRemoveAll = () => {
    const newList = todoList.filter(
      (todo: TaskModel) => !checkedList.includes(todo.id as string)
    );
    setTodoList(newList);
    setCheckedList([]);
    localStorage.setItem("todoList", JSON.stringify(newList));
  };
  useEffect(() => {
    onGetTodoList();
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Container>
            <Box textAlign="center" fontWeight="bold" mb={2} fontSize={20}>
              New Task
            </Box>
            <NewTask onSuccess={onGetTodoList} />
          </Container>
        </Grid>
        <Grid item xs={12} md={8} height="100vh" position="relative">
          <Container>
            <Box textAlign="center" fontWeight="bold" mb={2} fontSize={20}>
              To Do List
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextFieldCustom
                  placeholder="Search ..."
                  onChange={(e: any) => handleSearch(e)}
                />
              </Grid>
              {todoList &&
                todoList.length > 0 &&
                todoList.map((data, index) => (
                  <Grid item xs={12}>
                    <Paper>
                      <Stack
                        p={2}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label={data.taskTitle}
                          onChange={(event, checked: boolean) =>
                            handleClickChecked(data, checked)
                          }
                          checked={checkedList.includes(data.id as string)}
                        />
                        <Stack spacing={2} direction="row">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleClick(index)}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleRemove(data)}
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Stack>
                      <Collapse
                        in={hideGroups.indexOf(index) >= 0}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box p={2} borderTop={1} borderColor="black">
                          <NewTask
                            dataDetail={data}
                            onSuccess={onGetTodoList}
                          />
                        </Box>
                      </Collapse>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Container>
          {checkedList && checkedList.length > 0 && (
            <Box position="absolute" bottom={0} width="100%">
              <Stack
                p={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ backgroundColor: "#e0e0e0" }}
              >
                <Box>Bulk Action: </Box>
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={() => setCheckedList([])}
                  >
                    Done
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemoveAll}
                  >
                    Remove
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default TodoListScreen;
