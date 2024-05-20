const initialState = {
  tasks: [],
};

const addEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
      case 'DELETE_TASK_SUCCESS':
        return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.payload)
        };
    
    default:
      return state;
  }
};


export default addEditReducer;