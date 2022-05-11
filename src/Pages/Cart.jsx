import React from "react";
import ServerError from "Components/ServerError";
import Price from "Components/Price";
import Spinner from "Components/spinner";
import Slider from "Components/Slider";
import { Minus, Plus } from "Assets/Icons";
import StoreContext from "Context/storeContext";
import withHeader from "Layout/HeaderHoc";
import { sortAttributes, totalPrice, updateCart } from "Lib/utils";
import "Styles/cart.scss"


// cart page
class CartPage extends React.Component {
    static contextType = StoreContext;
    constructor() {
        super();
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

    handleOrder = () => {
        const { emptyCart, cart } = this.context
        if (cart.totalItems > 0) {
            emptyCart();
            alert("🎉 Your order is in the way!")
        }
    }

    render() {

        if (this.state.error) return <ServerError />
        const { currency, removeFromCart, addToCart, cart } = this.context


        if (!this.state.products) return <Spinner />
        const { products } = this.state
        let total = totalPrice(products, currency.active)
        const tax = (21 * total) / 100
        total = total + tax

        return (

            <main className="cart__page page">
                <div className="container">
                    <h1 className="uppercase">Cart</h1>
                    <div className="cart__items">
                        {products.length === 0 ? <div className="cart--empty">Cart is empty...</div> :
                            products.map((pro) => (
                                <CartProduct key={pro.id + JSON.stringify(pro.selectedAttribute)} removeFromCart={removeFromCart} addToCart={addToCart} currency={currency} {...pro} />
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
                    <button onClick={this.handleOrder} className={cart.totalItems === 0 ? "btn-disabled" : ""} >Order</button>
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
                    {
                        gallery.length > 1 ?
                            <Slider images={gallery} alt={name} /> : <img src={gallery[0]} alt={name} />
                    }
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

