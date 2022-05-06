import withHeader from "Layout/HeaderHoc"
import React from "react"

export default withHeader(class Checkout extends React.Component {

    render() {
        return (<main className="page checkout-page">
            <div className="container">
                <h1>Checkout</h1>
                <div className="payment">
                    <div className="total">
                        Total: <span></span>
                    </div>
                    <button>Pay</button>
                </div>
            </div>

        </main>)
    }
})