import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MouthImage from './components/MouthImage';
import MouthZoneSelector from './components/MouthZoneSelector';
import MouthOverview from './components/MouthOverview';

function App() {


  return (
<Router>
    <div className="App">

      <Routes>
        <Route path="/" element={<MouthOverview />} />
        <Route path='/select-zone' element={<MouthZoneSelector />} />
        <Route path='/mouth-zone/:zone' element={<MouthImage />} />
      </Routes>

    </div>

</Router>


  );
}

export default App;
