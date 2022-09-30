import { useState } from 'react';
import styled from 'styled-components';
import {
  IoIosAdd,
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoMdTrash,
  IoMdCreate,
} from 'react-icons/io';

import {
  useMutationCreateList,
  useMutationDeleteList,
  useMutationUpdateList,
  useQueryLists,
} from '../api';

import SubTaskList from './components/SubTaskList';
import Button from '../components/Button';
import Modal from '../components/Modal';

const TaskListAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: #2c5e50;
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
const TaskListContainer = styled.div`
  min-width: 70%;
  max-width: 80%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
`;

const TaskListItem = styled.div`
  width: 100%;
  color: white;
  overflow: hidden;
`;

const TaskListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: #2c3e50;
  font-weight: bold;
  cursor: pointer;
`;

const TaskListController = styled.div``;
interface TaskLiskItemProps {
  visible: boolean;
  className?: string;
}

const HelperTaskLiskItem: React.FC<
  React.PropsWithChildren<TaskLiskItemProps>
> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const TaskLiskItem = styled(HelperTaskLiskItem)`
  max-height: ${(props) => (props.visible ? '100vh' : '0')};
  padding: 0 0 0 1em;
  color: #2c3e50;
  background: white;
  transition: all 0.35s;
`;

const ModalInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  font-size: 1em;
`;

const ModalFooter = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Task = () => {
  const [activeTaskList, setActiveTaskList] = useState<number>(0);
  const [newTaskListName, setNewTaskListName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editedTaskListName, setEditedTaskListName] = useState<string>('');

  const { data: allLists } = useQueryLists();
  const mCreateList = useMutationCreateList();
  const mDeleteList = useMutationDeleteList();
  const mUpdateList = useMutationUpdateList(activeTaskList);

  const createNewList = () => {
    mCreateList.mutate({ name: newTaskListName });
    setNewTaskListName('');
  };

  const updateTaskListName = () => {
    mUpdateList.mutate({ name: editedTaskListName });
    setShowModal(!showModal);
  };

  const toggleList = (selectedTaskId: number) => {
    setActiveTaskList(activeTaskList === selectedTaskId ? 0 : selectedTaskId);
  };

  const toggleModal = (originalName: string) => {
    if (!showModal) {
      setEditedTaskListName(originalName);
    }
    setShowModal(!showModal);
  };

  return (
    <TaskListContainer>
      <TaskListAddContainer>
        <input
          value={newTaskListName}
          onChange={(e) => setNewTaskListName(e.target.value)}
        ></input>
        <Button disabled={!newTaskListName.length} type="Add">
          <IoIosAdd onClick={createNewList} />
        </Button>
      </TaskListAddContainer>
      {allLists &&
        allLists.map((taskList) => (
          <TaskListItem key={taskList.id}>
            <TaskListItemHeader onClick={() => toggleList(taskList.id)}>
              {taskList.name}
              <TaskListController>
                <Button type="Edit" onClick={() => toggleModal(taskList.name)}>
                  <IoMdCreate></IoMdCreate>
                </Button>
                <Button
                  type="Delete"
                  onClick={() => mDeleteList.mutate(taskList.id)}
                >
                  <IoMdTrash></IoMdTrash>
                </Button>
                {activeTaskList !== taskList.id && (
                  <Button onClick={() => toggleList(taskList.id)}>
                    <IoIosArrowRoundDown />
                  </Button>
                )}
                {activeTaskList === taskList.id && (
                  <Button onClick={() => toggleList(taskList.id)}>
                    <IoIosArrowRoundUp />
                  </Button>
                )}
              </TaskListController>
            </TaskListItemHeader>
            <TaskLiskItem visible={activeTaskList === taskList.id}>
              <SubTaskList TaskListId={taskList.id} />
            </TaskLiskItem>
          </TaskListItem>
        ))}
      <Modal visible={showModal} onClose={() => setShowModal(!showModal)}>
        <ModalInput
          value={editedTaskListName}
          onChange={(e) => setEditedTaskListName(e.target.value)}
        ></ModalInput>
        <ModalFooter>
          <Button
            type={'Save'}
            isText
            disabled={!editedTaskListName.length}
            onClick={updateTaskListName}
          >
            Save
          </Button>
          <Button
            type={'Cancel'}
            onClick={() => setShowModal(!showModal)}
            isText
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </TaskListContainer>
  );
};

export default Task;
