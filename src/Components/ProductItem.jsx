import React from "react"
import { Link } from "react-router-dom"

import Price from "Components/Price"
import { CartIcon } from "Assets/Icons";


export default class ProductItem extends React.Component {



    render() {
        const { currency, product, addToCart } = this.props
        const { name, gallery, prices, id, inStock } = product;
        return (
            <div className="product__item">
                <div className="image__wrapper">
                    {!inStock && <div className="product__item-outofstock">
                        out of stock
                    </div>}
                    <img src={gallery[0]} alt={name} />
                    {inStock && <button onClick={() => {
                        addToCart(id)
                    }}>
                        <CartIcon />

                    </button>}
                </div>
                <Link className="product__info" to={`/products/${id}`}>
                    <h4>{name}</h4>
                    <Price currency={currency} prices={prices} />
                </Link>
            </div>
        )
    }
}