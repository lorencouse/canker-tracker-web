import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function NewSoresQuestionaire() {

    const navigate = useNavigate();
    const currentDate = new Date();

    // function yesHandler() {
    //     await saveLogTime(currentDate);
    //     navigate('/', {state: { addMode: true }} )
    // }

    return (
        <div>
            <h2>Do you have any new Cankersores?</h2>
            <div className="flex-row justify-around">
                <Button label="Yes" action={ () => navigate('/', {state: { addMode: true,  }} ) }/>
                <Button label="No" action={ () => navigate('/dailyLog') }/>
            </div>
        </div>
    )
}