import { createStore, combineReducers } from 'redux';
import taskReducer from './reduers/taskReducer';
import addEditReducer from './reduers/addEditReducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    addtask : addEditReducer,
    delete: addEditReducer
});

const store = createStore(rootReducer);

export default store;
