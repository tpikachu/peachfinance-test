interface ITask {
  id: number;
  text: string;
  list_id: number;
}

interface IList {
  id: number;
  name: string;
  tasks?: ITask[];
}

export type { IList, ITask };
