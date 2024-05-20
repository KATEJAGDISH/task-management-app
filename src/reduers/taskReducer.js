import { FETCH_TASKS_SUCCESS, UPDATE_TASK_SUCCESS } from '../actions/taskActions';

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        default:
            return state;
    }
};

export default taskReducer;
