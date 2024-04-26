import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CankerSoresProvider } from './context/CankerSoresContext';
import DailyLogView from './Pages/DailyLogView';
import { Home } from './Pages/home';


function App() {


  return (
<CankerSoresProvider>

<Router>
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="daily-log" element={<DailyLogView />} />
      </Routes>

    </div>

</Router>
</CankerSoresProvider>



  );
}

export default App;
