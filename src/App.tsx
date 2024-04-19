import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MouthOverview from './views/MouthOverview';
import { CankerSoresProvider } from './context/CankerSoresContext';


function App() {


  return (
<CankerSoresProvider>

<Router>
    <div className="App">

      <Routes>
        <Route path="/" element={<MouthOverview />} />
      </Routes>

    </div>

</Router>
</CankerSoresProvider>



  );
}

export default App;
