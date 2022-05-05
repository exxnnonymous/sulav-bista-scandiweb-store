import React from "react"
import { Link } from "react-router-dom"

import Price from "Components/Price"
import LazyImg from "./LazyImg";
import { CartIcon } from "Assets/Icons";


export default class ProductItem extends React.Component {

    render() {
        const { currency, product, addToCart } = this.props
        const { name, gallery, prices, id, inStock, brand, attributes } = product;

        const defaultAttribute = {}
        attributes.forEach(attribute => {
            defaultAttribute[attribute.id] = attribute.items[0].id
        })

        return (
            <div className="product__item" >
                <Link to={`/products/${id}`}></Link>
                <div className="image__wrapper">
                    {!inStock && <div className="product__item-outofstock bg-white">
                        out of stock
                    </div>}
                    <LazyImg src={gallery[0]} alt={name} />
                    {inStock &&
                        <button href="/product" onClick={() => { addToCart(id, defaultAttribute) }}>
                            <CartIcon />
                        </button>
                    }
                </div>
                <div className="product__info" >
                    <h4>{brand} {name}</h4>
                    <Price currency={currency} prices={prices} />
                </div>
            </div>
        )
    }
}