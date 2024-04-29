import React, { useState } from "react";
import MouthOverview from "../views/MouthOverview";
import Navbar from "../components/Page/Navbar";
import Footer from "../components/Page/Footer";
import DailyLog from "./dailyLog";

export function Home() {
    const [navigateTo, setNavigateTo] = useState("mouthOverview")

    return (
        <body>
        <Navbar />
         <div id="main-container" className="">
        <MouthOverview />

        <DailyLog />


        </div>
        <Footer />

        </body>


    )
}