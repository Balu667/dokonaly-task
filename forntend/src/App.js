import { Route, Router, Routes } from 'react-router';
import './App.css';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Auth } from './pages/Auth/Auth';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
     </Routes>
    </div>
  );
}

export default App;
