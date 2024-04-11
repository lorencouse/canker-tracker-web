import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MouthImage from './views/DailyLogView';
import MouthZoneSelector from './views/MouthZoneSelectorView';
import MouthOverview from './views/MouthOverview';
import AddSoreView from './views/DailyLogView';
import EditSoreView from './views/EditSoreView';
import { CankerSoresProvider } from './context/CankerSoresContext';


function App() {


  return (
<CankerSoresProvider>

<Router>
    <div className="App">

      <Routes>
        <Route path="/" element={<MouthOverview />} />
        <Route path='/select-zone' element={<MouthZoneSelector />} />
        <Route path='/mouth-zone/:zone' element={<AddSoreView />} />
        <Route path='/edit-sore/' element={<EditSoreView />} />
      </Routes>

    </div>

</Router>
</CankerSoresProvider>



  );
}

export default App;
