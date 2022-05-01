import { Cross } from "Assets/Icons";
import React from "react";


export default class ServerError extends React.Component{

    render(){
        return (
            <div className="error__page">
                <div className="header">
                    <span>
                        <Cross />                        
                    </span>
                Some Error Occured!
                </div>
            </div>
        )
    }
}