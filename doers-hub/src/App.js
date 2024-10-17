import React from 'react';
import EmployeeDashboard from './components/EmployeeDashboard';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <EmployeeDashboard />
    </div>
  );
}

export default App;