import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CankerSoresProvider } from './context/CankerSoresContext';
import DailyLogView from './Pages/dailyLog';
import Navbar from './components/Page/Navbar';
import Footer from './components/Page/Footer';
import MouthOverview from './views/MouthOverview';
import NewSoresQuestionaire from './views/NewSoresQuestionaire';


function App() {







  return (
<CankerSoresProvider>

<Router>
    <div className="App">
    <Navbar />
      <Routes>
        <Route path="/" element={<MouthOverview />} />
        <Route path="/dailyLog" element={<DailyLogView />} />
        <Route path="/newSores" element={<NewSoresQuestionaire />} />
      </Routes>
    <Footer />
    </div>

</Router>
</CankerSoresProvider>



  );
}

export default App;
