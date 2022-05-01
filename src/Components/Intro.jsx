import React from "react";
import { Logo } from "Assets/Icons";


export default class Intro extends React.Component {
    
    render() {
        const { endLoading } = this.props
        return (
            <div className={`intro__wrapper ${endLoading ? "loading-end" : ""}`}>
                <div className="loading__box">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="wrapper">
                        <div className="loader">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}