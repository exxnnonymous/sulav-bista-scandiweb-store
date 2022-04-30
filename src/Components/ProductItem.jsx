import React from "react"
import { Link } from "react-router-dom"

import Price from "Components/Price"


export default class ProductItem extends React.Component {



    render() {
        const { currency, product } = this.props
        const { name, gallery, prices, id, inStock } = product;

        return (
            <Link className="product__item" to={`/products/${id}`}>
                <div className="image__wrapper">
                    {!inStock && <div className="product__item-outofstock">
                        out of stock
                    </div>}
                    <img src={gallery[0]} alt={name} />
                </div>
                <div className="product__info" >
                    <h4>{name}</h4>
                    <Price currency={currency} prices={prices} />
                </div>
            </Link>
        )
    }
}