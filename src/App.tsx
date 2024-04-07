import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MouthImage from './views/AddSoreView';
import MouthZoneSelector from './views/MouthZoneSelectorView';
import MouthOverview from './views/MouthOverview';
import AddSoreView from './views/AddSoreView';

function App() {


  return (
<Router>
    <div className="App">

      <Routes>
        <Route path="/" element={<MouthOverview />} />
        <Route path='/select-zone' element={<MouthZoneSelector />} />
        <Route path='/mouth-zone/:zone' element={<AddSoreView />} />
        <Route path='/edit-sore/:zone' element={<MouthImage />} />
      </Routes>

    </div>

</Router>


  );
}

export default App;
