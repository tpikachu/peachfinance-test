interface List {
  id: string;
  name: string;
}

interface Task {
  id: string;
  content: string;
  listId: string;
}

interface Data {
  lists: List[];
  tasks: Task[];
}

const mockData: Data = {
  lists: [
    {
      id: '1',
      name: 'Personal',
    },
    {
      id: '2',
      name: 'Business',
    },
  ],
  tasks: [
    {
      id: '1',
      content: 'Do the dishes',
      listId: '1',
    },
    {
      id: '2',
      content: 'Walk the dog',
      listId: '1',
    },
    {
      id: '3',
      content: 'Finish processing payroll',
      listId: '2',
    },
    {
      id: '4',
      content: 'Set up planning meeting with all the developers',
      listId: '2',
    },
  ],
};

export default mockData;
