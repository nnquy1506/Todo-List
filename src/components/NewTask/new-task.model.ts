import { TaskModel } from "../../screens/TodoListScreen/todo-list.model";

export interface NewTaskPropsModel {
  dataDetail?: TaskModel;
  onSuccess: () => void;
}
