import React from "react";
import MouthOverview from "../views/MouthOverview";
import Navbar from "../components/Page/Navbar";
import Footer from "../components/Page/Footer";

export function Home() {
    return (
        <body>
        <Navbar />
         <div id="home-container" className="">
        <MouthOverview />
        </div>
        <Footer />

        </body>


    )
}