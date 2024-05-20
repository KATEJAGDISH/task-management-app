import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route from react-router-dom
import './App.css';

import Task from './components/Task';
import { Provider } from 'react-redux';
import store from './store';
import AllTask from './components/page/AllTask';
import Home from './components/page/Home';
import Nopage from './components/page/Nopage';
import AddTask from './components/AddTask';
import Overdeu from './components/page/Overdeu';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Board" element={<Task />} />
          <Route path="/Alltask" element={<AllTask />} />
          <Route path="/Addtask" element={<AddTask />} />
          <Route path="/overduetasks" element={<Overdeu />} />
          <Route path="/*" element={<Nopage/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
