import React from "react";
import { createPortal } from "react-dom";
import { sortAttributes, totalPrice, updateCart } from "Lib/utils";
import { Minus, Plus } from "Assets/Icons";
import StoreContext from "Context/storeContext";
import Price from "Components/Price";
import { Attribute } from "Pages/Cart";
import { Link } from "react-router-dom";
import "Styles/cartOverlay.scss"

const cartRoot = document.getElementById("cart-overlay");


export default class CartOverlay extends React.Component {
    static contextType = StoreContext
    constructor(props) {
        super(props);
        this.element = document.createElement("div");
        this.state = {
            products: null,
            error: false,
        }

    }



    async componentDidMount() {
        cartRoot.appendChild(this.element);
        await updateCart.bind(this)()
    }
    async componentDidUpdate() {
        const { cart } = this.context
        if (cart.needsUpdate) {
            await updateCart.bind(this)()
        }
    }

    componentWillUnmount() {
        cartRoot.removeChild(this.element);

    }


    render() {
        const { open } = this.props;
        const { cart } = this.context
        const { error, products } = this.state
        return createPortal(
            <div className={`cart__overlay ${open ? "open" : ""}`}>
                <div className="container">
                    <CartBox totalItems={cart.totalItems} error={error} products={products} />
                </div>
            </div>, this.element)
    }

}

class CartBox extends React.Component {
    static contextType = StoreContext
    render() {
        const { totalItems, products, error } = this.props

        if (error) return <div>Error...</div>
        const { currency, removeFromCart, addToCart } = this.context

        if (!products) return <div>Loading...</div>

        const total = totalPrice(products, currency.active)

        return (
            <div className="cart__box bg-white" >
                <h3>My Bag, <span>{totalItems} items</span></h3>


                {products.length === 0 ? <span className="cart--empty">Cart is empty...</span> :
                    (<>
                        <div className="cart__items">
                            {products.map((pro, idx) => (
                                <CartItems key={"cart--overlay--" + pro.id + idx} removeFromCart={removeFromCart} addToCart={addToCart} currency={currency} {...pro} />
                            ))}
                        </div>

                        <div className="cart__total">
                            <div className="total">
                                <span>Total</span>
                                <span>
                                    {currency.active.symbol} {total.toFixed(2)}
                                </span>
                            </div>
                            <div className="cart__links">
                                <Link to="/cart">View Bag</Link>
                                <Link to="/checkout" >Check out</Link>
                            </div>
                        </div>
                    </>)
                }

            </div >
        )
    }
}
class CartItems extends React.Component {
    render() {
        const { brand, name, prices, currency, gallery, attributes, removeFromCart, id, selectedAttribute, quantity, addToCart } = this.props
        const sortedAttr = sortAttributes(attributes)
        return (
            <div className="cart__item">
                <div className="product">
                    <div className="product__description">
                        <h2>{brand}</h2>
                        <h1>{name}</h1>
                        <Price currency={currency.active} prices={prices} />
                        <Attribute sortedAttr={sortedAttr} selected={selectedAttribute} />
                    </div>
                    <div className="product__action">
                        <button onClick={() => { addToCart(id, selectedAttribute); }}>
                            <Plus />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => { removeFromCart(id, selectedAttribute); }}>
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