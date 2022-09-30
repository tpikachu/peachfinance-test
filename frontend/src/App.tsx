import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import Task from './Task';

/*

Examples of fetching and modifying data. These hooks use react-query
under the hood. All hooks starting with useQuery return the query
object from react-query's useQuery. All hooks starting with useMutation
return the mutation object from react-query's useMutation.

import {
  useMutationCreateList,
  useMutationCreateTask,
  useMutationDeleteList,
  useMutationDeleteTask,
  useMutationUpdateList,
  useQueryList,
  useQueryLists,
  useQueryTask,
  useQueryTasks,
} from "./api";

const MyComponent = () => {
  const { data: allLists } = useQueryLists();
  const { data: allListsWithTasks } = useQueryLists({ includeTasks: true });
  const { data: list4 } = useQueryList({ listId: 4 });
  const { data: list4WithTasks } = useQueryList({
    listId: 4,
    includeTasks: true,
  });
  const { data: tasksOnList4 } = useQueryTasks(4);
  const { data: task7 } = useQueryTask(7);
  const mCreateList = useMutationCreateList();
  const mUpdateList4 = useMutationUpdateList(4);
  const mDeleteList = useMutationDeleteList();
  const mCreateTaskOnList4 = useMutationCreateTask(4);
  const mDeleteTask = useMutationDeleteTask();

  return (
    <div>
      <div>{`allLists: ${JSON.stringify(allLists)}`}</div>
      <div>{`allListsWithTasks: ${JSON.stringify(allListsWithTasks)}`}</div>
      <div>{`list4: ${JSON.stringify(list4)}`}</div>
      <div>{`list4WithTasks: ${JSON.stringify(list4WithTasks)}`}</div>
      <div>{`tasksOnList4: ${JSON.stringify(tasksOnList4)}`}</div>
      <div>{`task7: ${JSON.stringify(task7)}`}</div>
      <button onClick={() => mCreateList.mutate({ name: "fooList" })}>
        Create list
      </button>
      <button onClick={() => mUpdateList4.mutate({ name: "barList" })}>
        Update list 4
      </button>
      <button onClick={() => mDeleteList.mutate(4)}>Delete list 4</button>
      <button onClick={() => mCreateTaskOnList4.mutate({ text: "bazTask" })}>
        Create task on list 4
      </button>
      <button onClick={() => mDeleteTask.mutate(7)}>Delete task 7</button>
    </div>
  );
};

*/

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Task />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
