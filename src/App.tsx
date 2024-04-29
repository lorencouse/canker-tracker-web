import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CankerSoresProvider } from './context/CankerSoresContext';
import DailyLogView from './Pages/dailyLog';
import { Home } from './Pages/home';
import Navbar from './components/Page/Navbar';
import Footer from './components/Page/Footer';
import MouthOverview from './views/MouthOverview';


function App() {


  return (
<CankerSoresProvider>

<Router>
    <div className="App">
    <Navbar />
      <Routes>
        <Route path="/" element={<MouthOverview />} />
        <Route path="/dailyLog" element={<DailyLogView />} />
      </Routes>
    <Footer />
    </div>

</Router>
</CankerSoresProvider>



  );
}

export default App;
