import { Minus, Plus } from "Assets/Icons";
import Price from "Components/Price";
import StoreContext from "Context/storeContext";
import withHeader from "Layout/HeaderHoc";
import { sortAttributes, totalPrice, updateCart } from "Lib/utils";
import React from "react";
import { Link } from "react-router-dom";
import "Styles/cart.scss"
import ServerError from "Components/ServerError";


// cart page
class CartPage extends React.Component {
    static contextType = StoreContext;
    constructor() {
        super();
        document.title = "Cart - Scandiweb Store";
        this.state = {
            products: null,
            error: false,
        }
    }


    async componentDidMount() {
        await updateCart.bind(this)()
    }

    async componentDidUpdate() {
        if (this.context.cart.needsUpdate) {
            await updateCart.bind(this)()
        }
    }

    handleLink = (e) => {
        if (this.context.cart.totalItems === 0) {
            e.preventDefault()
        }
    }

    render() {

        if (this.state.error) return <ServerError />
        const { currency, removeFromCart, addToCart, cart } = this.context


        if (!this.state.products) return <div>Loading...</div>
        const { products } = this.state
        const total = totalPrice(products, currency.active)
        const tax = (21 * total) / 100

        return (

            <main className="cart__page page">
                <div className="container">
                    <h1 className="uppercase">Cart</h1>
                    <div className="cart__items">
                        {products.length === 0 ? <div className="cart--empty">Cart is empty...</div> :
                            products.map((pro) => (
                                <CartProduct key={pro.id + pro.selectedAttribute.toString()} removeFromCart={removeFromCart} addToCart={addToCart} currency={currency} {...pro} />
                            ))
                        }
                    </div>
                    <div className="cart__total">
                        Tax 21%:  <span>{currency.active.symbol} {tax.toFixed(2)}</span>
                        Quantity: <span>{cart.totalItems}</span>
                        Total: <span>
                            {currency.active.symbol} {total.toFixed(2)}
                        </span>
                    </div>
                    <Link to="/checkout" onClick={this.handleLink} className={cart.totalItems === 0 ? "btn-disabled" : ""} >Order</Link>
                </div>
            </main>);
    }
}

export default withHeader(CartPage);


// products in cart page
class CartProduct extends React.Component {

    render() {
        const { brand, name, prices, currency, gallery, attributes, removeFromCart, id, selectedAttribute, quantity, addToCart } = this.props
        const sortedAttr = sortAttributes(attributes)
        return (

            <div className="cart__item">
                <div className="cart__info">
                    <div className="product__info">
                        <h2>{brand}</h2>
                        <h1>{name}</h1>
                        <Price currency={currency.active} prices={prices} />
                        <Attribute sortedAttr={sortedAttr} selected={selectedAttribute} />
                    </div>
                    <div className="cart__action">
                        <button onClick={() => { addToCart(id, selectedAttribute) }}>
                            <Plus />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => { removeFromCart(id, selectedAttribute) }}>
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
                {sortedAttr.map((attribute) => {
                    return (
                        <AttributeItem key={attribute.id} {...attribute} selected={selected[attribute.id]} />
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

