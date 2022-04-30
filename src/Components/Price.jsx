import React from "react";
import { filterPrice } from "Lib/utils";

class Price extends React.Component {
    state = {  } 
    render() { 
        const {prices, currency} = this.props
        const price = filterPrice(prices, currency)
        return (
            <span>{price.currency.symbol} {price.amount.toFixed(2)}</span>
        );
    }
}
 
export default Price;