import { Minus, Plus } from "Assets/Icons";
import Price from "Components/Price";
import TotalPrice from "Components/TotalPrice";
import StoreContext from "Context/storeContext";
import { sortAttributes } from "Lib/utils";
import React from "react";
import { Link } from "react-router-dom";
import "Styles/cart.scss"


// cart page
class CartPage extends React.Component {
    static contextType = StoreContext;
    constructor() {
        super();
        document.title = "Cart - Scandiweb Store"
    }
    handleLink = (e) => {
        if (this.context.cart.totalItems === 0) {
            e.preventDefault()
        }
    }
    render() {
        const { productsInCart, currency, removeFromCart, addToCart, cart } = this.context
        const products = productsInCart();
        return (<main className="cart__page page">
            <div className="container">
                <h1 className="uppercase">Cart</h1>
                <div className="cart__items">
                    {products.length === 0 ? <div className="cart--empty">Cart is empty...</div> :
                        products.map((pro, idx) => (
                            <CartProduct key={pro.id + idx} removeFromCart={removeFromCart} addToCart={addToCart} currency={currency} {...pro} />
                        ))
                    }
                </div>
                <div className="cart__total">
                    <div className="quantity">
                        Qty: <span>{cart.totalItems}</span>
                    </div>
                    <div className="total">
                        Total: <TotalPrice products={products} currency={currency.active} />
                    </div>
                    <Link to="/checkout" onClick={this.handleLink} className={cart.totalItems === 0 ? "btn-disabled" : ""} >Order</Link>
                </div>
            </div>
        </main>);
    }
}

export default CartPage;


// products in cart page
class CartProduct extends React.Component {

    render() {
        const { brand, name, prices, currency, gallery, attributes, removeFromCart, id, selected, quantity, addToCart } = this.props
        const sortedAttr = sortAttributes(attributes)
        return (

            <div className="cart__item">
                <div className="cart__info">
                    <div className="product__info">
                        <h2>{brand}</h2>
                        <h1>{name}</h1>
                        <Price currency={currency.active} prices={prices} />
                        <Attribute sortedAttr={sortedAttr} selected={selected} />
                    </div>
                    <div className="cart__action">
                        <button onClick={() => { addToCart(id, selected) }}>
                            <Plus />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => { removeFromCart(id, selected) }}>
                            <Minus />
                        </button>
                    </div>
                </div>
                <div className="product__img">
                    <img src={gallery[0]} alt={name} />
                </div>
            </div>
        )
    }
}

// attribute of product
export class Attribute extends React.Component {

    render() {
        const { sortedAttr, selected } = this.props
        return (
            <div className="product__attributes">
                {sortedAttr.map((attr, id) => {
                    return (
                        <AttributeItem key={attr.id} {...attr} selected={selected[id]} />
                    )
                })}
            </div>
        )
    }
}

// items from attribute
export class AttributeItem extends React.Component {

    render() {
        const { name, type, items, selected } = this.props
        return (
            <div className="product__attribute">
                <h6>{name}:</h6>
                <div className={`product__attribute-${type === "swatch" ? "color" : "text"}`}>
                    {items.map(i => {
                        const style = type === "swatch" ? { "--color": i.value } : null;
                        return (
                            <div key={i.id} className={`attr__group ${selected === i.id ? "attr__selected" : ""}`} style={style}>
                                {type === "text" && i.value}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

