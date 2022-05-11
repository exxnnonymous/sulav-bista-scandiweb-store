import React from "react";
import { sortAttributes, totalPrice, updateCart } from "Lib/utils";
import { Minus, Plus } from "Assets/Icons";
import StoreContext from "Context/storeContext";
import Price from "Components/Price";
import { Attribute } from "Pages/Cart";
import { Link } from "react-router-dom";
import "Styles/cartOverlay.scss"
import Spinner from "./spinner";



// cart overlay
export default class CartOverlay extends React.Component {
    static contextType = StoreContext
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            error: false,
        }

    }



    async componentDidMount() {
        await updateCart.bind(this)()
    }
    async componentDidUpdate() {
        const { cart } = this.context
        if (cart.needsUpdate) {
            await updateCart.bind(this)()
        }
    }


    handleCheckout = () => {
        const { emptyCart, cart } = this.context
        if (cart.totalItems > 0) {
            emptyCart();
            alert("🎉 Your order is in the way!")

        }
    }


    render() {
        const { cartOpen, closeCart } = this.props;
        const { cart } = this.context
        const { error, products } = this.state
        return (
            <div className={`cart__overlay ${cartOpen ? "open" : ""}`} onClick={closeCart}>
                <div className="cart__container" >
                    <div className="cart__box bg-white" onClick={(e) => { e.stopPropagation() }}>
                        <h3>My Bag, <span>{cart.totalItems} items</span></h3>

                        <CartBox error={error} products={products} handleCheckout={this.handleCheckout} />
                    </div>
                </div>
            </div>)
    }

}


// cart items wrapper
class CartBox extends React.Component {
    static contextType = StoreContext
    render() {
        const { products, error, handleCheckout } = this.props

        if (error) return <div className="cart-error">Internal Server Error!</div>
        if (!products) return <div className="cart-spinner"><Spinner /></div>

        const { currency, removeFromCart, addToCart } = this.context

        let total = totalPrice(products, currency.active)
        const tax = (21 * total) / 100
        total = total + tax

        return (
            <>


                {products.length === 0 ? <div className="cart-empty">Cart is empty...</div> :
                    (<>
                        <div className="cart__items">
                            {products.map(pro => (
                                <CartItems key={"cart--overlay--" + pro.id + JSON.stringify(pro.selectedAttribute)} removeFromCart={removeFromCart} addToCart={addToCart} currency={currency} {...pro} />
                            ))}
                        </div>

                        <div className="cart__total">
                            <div className="total">
                                <span>Total <span>(including 21% tax)</span></span>
                                <span>
                                    {currency.active.symbol} {total.toFixed(2)}
                                </span>
                            </div>
                            <div className="cart__links">
                                <Link to="/cart">View Bag</Link>
                                <button onClick={handleCheckout} >Check out</button>
                            </div>
                        </div>
                    </>)
                }

            </ >
        )
    }
}

//  each cart items
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
                        <button onClick={() => {
                            removeFromCart(id, selectedAttribute)
                        }
                        }>
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