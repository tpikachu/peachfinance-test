import { useState } from 'react';
import styled from 'styled-components';
import { IoIosAdd, IoMdTrash } from 'react-icons/io';
import {
  useMutationCreateTask,
  useMutationDeleteTask,
  useQueryList,
} from '../../api';

import Button from '../../components/Button';

const SubTaskListAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  color: white;
  font-weight: bold;
  cursor: pointer;

  input {
    width: 150px;
    &:hover {
      width: 80%;
      transition: all 0.2s ease-out;
    }
  }
`;

const SubTaskListContainer = styled.div`
  min-width: 100%;
  overflow: hidden;
  background: #6c3e50;
`;

const SubTaskListItem = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  font-weight: bold;
  cursor: pointer;
`;

interface PSubSubTaskList {
  TaskListId: number;
}

const SubTaskList = ({ TaskListId }: PSubSubTaskList) => {
  const [newTaskText, setNewTaskText] = useState<string>('');

  const { data: subTaskList } = useQueryList({
    listId: TaskListId,
    includeTasks: true,
  });

  const mCreateSubTaskOnList = useMutationCreateTask(TaskListId);
  const mDeleteTask = useMutationDeleteTask();

  const createNewTask = () => {
    mCreateSubTaskOnList.mutate({ text: newTaskText });
    setNewTaskText('');
  };

  return (
    <SubTaskListContainer>
      <SubTaskListAddContainer>
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        ></input>
        <Button disabled={!newTaskText.length} type="Add">
          <IoIosAdd onClick={createNewTask} />
        </Button>
      </SubTaskListAddContainer>
      {subTaskList?.tasks &&
        subTaskList?.tasks.map((task) => (
          <SubTaskListItem key={task.id}>
            {task.text}
            <Button onClick={() => mDeleteTask.mutate(task.id)} type="Delete">
              <IoMdTrash></IoMdTrash>
            </Button>
          </SubTaskListItem>
        ))}
    </SubTaskListContainer>
  );
};

export default SubTaskList;
