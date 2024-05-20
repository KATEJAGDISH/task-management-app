export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';

export const fetchTasksSuccess = (tasks) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const updateTaskSuccess = (task) => ({
    type: UPDATE_TASK_SUCCESS,
    payload: task,
});
export const addTask = (taskData) => ({
  type: 'ADD_TASK',
  payload: taskData,
});
export const deleteTaskSuccess = (taskId) => ({
    type: 'DELETE_TASK_SUCCESS',
    payload: taskId
});
