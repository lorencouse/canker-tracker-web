import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CankerSoresProvider } from './context/CankerSoresContext';
import DailyLogView from './Pages/dailyLog';
import Navbar from './components/Page/Navbar';
import Footer from './components/Page/Footer';
import MouthOverview from './Pages/mouthOverview';
import NewSoresQuestionaire from './Pages/newSoresQuestionaire';


function App() {







  return (
<CankerSoresProvider>

<Router>
    <div className="App">
    <Navbar />
      <Routes>
        <Route path="/" element={<MouthOverview />} />
        <Route path="/daily-log" element={<DailyLogView />} />
        <Route path="/new-sores" element={<NewSoresQuestionaire />} />
      </Routes>
    <Footer />
    </div>

</Router>
</CankerSoresProvider>



  );
}

export default App;
