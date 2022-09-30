export interface ITaskList {
  id: number;
  title: string;
  tasks: ITask[];
}

export interface ITaskTag {
  title: string;
}

// export interface ITaskDetails extends ITask {
//   list: IProjectList;

//   createdAt: string;
//   owner: IUser;
//   assignees: IUser[];
// }

export interface ITask {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  tags: ITaskTag[];
}
