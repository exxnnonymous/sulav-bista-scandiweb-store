import React from "react";
import { createPortal } from "react-dom";
import { sortAttributes } from "Lib/utils";
import { Minus, Plus } from "Assets/Icons";
import StoreContext from "Context/storeContext";
import Price from "Components/Price";
import "Styles/CartOverlay.scss"
import { Attribute } from "Pages/Cart";
import { Link } from "react-router-dom";
import TotalPrice from "./TotalPrice";

const cartRoot = document.getElementById("cart-overlay");


export default class CartOverlay extends React.Component {
    static contextType = StoreContext
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
        const { open } = this.props;
        const { cart } = this.context
        return createPortal(
            <div className={`cart__overlay ${open ? "open" : ""}`}>
                <div className="container">
                    <CartBox totalItems={cart.totalItems} />
                </div>
            </div>, this.element)
    }

}



class CartBox extends React.Component {
    static contextType = StoreContext
    render() {
        const { totalItems } = this.props
        const { productsInCart, currency, removeFromCart, addToCart } = this.context
        const products = productsInCart();
        return (
            <div className="cart__box" >
                <h3>My Bag, <span>{totalItems} items</span></h3>


                {products.length === 0 ? <span>Cart is empty</span> :

                    <>


                        <div className="cart__items">
                            {products.map((pro, idx) => (
                                <CartItems key={pro.id + idx} removeFromCart={removeFromCart} addToCart={addToCart} currency={currency} {...pro} />
                            ))}
                        </div>

                        <div className="cart__total">
                            <div className="total">
                                <span>Total</span>
                                <TotalPrice products={products} currency={currency.active} />
                            </div>
                            <div className="cart__links">
                                <Link to="/cart">View Bag</Link>
                                <Link to="/checkout" >Check out</Link>
                            </div>
                        </div>
                    </>
                }

            </div >
        )
    }
}


class CartItems extends React.Component {
    render() {
        const { brand, name, prices, currency, gallery, attributes, removeFromCart, id, selected, quantity, addToCart } = this.props
        const sortedAttr = sortAttributes(attributes)
        return (
            <div className="cart__item">
                <div className="product">
                    <div className="product__description">
                        <h2>{brand}</h2>
                        <h1>{name}</h1>
                        <Price currency={currency.active} prices={prices} />
                        <Attribute sortedAttr={sortedAttr} selected={selected} />
                    </div>
                    <div className="product__action">
                        <button onClick={() => { addToCart(id, selected) }}>
                            <Plus />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => { removeFromCart(id) }}>
                            <Minus />
                        </button>
                    </div>
                </div>
                <div className="product__img">
                    <img src={gallery[0]} alt={name} />
                </div>
            </div>)
    }
}