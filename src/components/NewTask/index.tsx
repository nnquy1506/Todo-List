import React from "react";
import { Grid, MenuItem, Select, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import TextFieldCustom from "../TextFieldCustom";
import LabelInput from "../LabelInput";
import { NewTaskPropsModel } from "./new-task.model";
import { TaskModel } from "../../screens/TodoListScreen/todo-list.model";
import { NewGuid } from "../../untils";
const NewTask = (props: NewTaskPropsModel) => {
  const { dataDetail, onSuccess } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      taskTitle: dataDetail?.taskTitle || "",
      description: dataDetail?.description || "",
      dueDate: dataDetail?.dueDate ? moment(dataDetail?.dueDate) : moment(),
      priority: dataDetail?.priority || "NORMAL",
    },
  });

  const onSubmit = (data: FieldValues) => {
    const allData: any = localStorage.getItem("todoList");
    if (!allData) {
      localStorage.setItem(
        "todoList",
        JSON.stringify([{ ...data, id: NewGuid() }])
      );
      reset();
    } else {
      const dataParse = JSON.parse(allData);
      if (!!dataDetail) {
        const params = { ...dataDetail, ...data };
        const newDate = dataParse.map((todo: TaskModel) =>
          todo?.id === dataDetail?.id ? params : todo
        );
        localStorage.setItem("todoList", JSON.stringify(newDate));
      } else {
        dataParse.push({ ...data, id: NewGuid() });
        localStorage.setItem("todoList", JSON.stringify(dataParse));
        reset();
      }
    }
    onSuccess();
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
          rules={{ required: "This field is required" }}
          name="taskTitle"
          control={control}
          render={({ field }) => (
            <TextFieldCustom
              placeholder="Add new task ..."
              error={!!errors?.taskTitle?.message}
              helperText={errors?.taskTitle?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <LabelInput title="Description" />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextFieldCustom
              placeholder="Description ..."
              multiline
              minRows={4}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelInput title="Due Date" />
        <Controller
          rules={{ required: "This field is required" }}
          name="dueDate"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <DesktopDatePicker
              format="DD MMM YYYY"
              slotProps={{ textField: { size: "small" } }}
              onChange={onChange}
              value={value}
              ref={ref}
              disablePast={true}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelInput title="Priority" />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select size="small" fullWidth {...field}>
              <MenuItem value={"LOW"}>Low</MenuItem>
              <MenuItem value={"NORMAL"}>Normal</MenuItem>
              <MenuItem value={"HIGH"}>High</MenuItem>
            </Select>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          color="success"
        >
          {!!dataDetail ? "Update" : "Add"}
        </Button>
      </Grid>
    </Grid>
  );
};
export default NewTask;
