import React from "react";
import { createPortal } from "react-dom";
import "Styles/CartOverlay.scss"

const cartRoot = document.getElementById("cart-overlay");


export default class CartOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.element = document.createElement("div");
    }
    componentDidMount() {
        cartRoot.appendChild(this.element);
    }
    componentWillUnmount() {
        cartRoot.removeChild(this.element);
    }


    render() {
        const { open } = this.props
        console.log(open)
        return createPortal(<div className={`cart__overlay ${open ? "open" : ""}`}>
            <div className="container">
                <div className="cart__box">
                    fds
                </div>
            </div>
        </div>, this.element)
    }

}