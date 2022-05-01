import React from "react";
import { totalPrice } from "Lib/utils";

class TotalPrice extends React.Component{

    render(){
        const {products, currency} = this.props;
        const total =  totalPrice(products, currency)
        
        return (
            <span>
               {currency.symbol} {total.toFixed(2)}
            </span>
        )
    }
}

export default TotalPrice;