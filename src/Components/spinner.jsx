import React from "react"
import "Styles/spinner.scss"

export default class Spinner extends React.Component {

    render() {
        return (
            <div className="spinner__wrapper">
                <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}