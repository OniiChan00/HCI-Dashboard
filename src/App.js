import logo from './logo.svg';
import './App.css';
import Homework from './components/Homework';
import Project from './components/Project';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/project' element={<Project/>}/>
    </Routes>
    </div>
  );
}

export default App;
