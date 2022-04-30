import { Minus, Plus } from "Assets/Icons";
import Price from "Components/Price";
import Attribute from "Components/ProductAttribute";
import StoreContext from "Context/storeContext";
import { sortAttributes } from "Lib/utils";
import React from "react";
import "Styles/Cart.scss"

class CartPage extends React.Component {
    static contextType = StoreContext;
    render() {
        const { productsInCart, currency, removeFromCart } = this.context
        const products = productsInCart();
        return (<main className="cart__page">
            <div className="container">
                <h1>Cart</h1>
                <div className="cart__items">
                    {products.length === 0 ? "Cart is empty" :
                        products.map(pro => (
                            <CartProduct key={pro.id} removeFromCart={removeFromCart} currency={currency} {...pro} />
                        ))
                    }
                </div>
            </div>
        </main>);
    }
}

export default CartPage;


class CartProduct extends React.Component {

    render() {
        const { category, name, prices, currency, gallery, attributes, removeFromCart, id } = this.props
        const sortedAttr = sortAttributes(attributes)
        return (

            <div className="cart__item">
                <div className="cart__info">
                    <div className="product__info">
                        <h2>{category}</h2>
                        <h1>{name}</h1>
                        <Price currency={currency.active} prices={prices} />
                        <div className="product__attributes">
                            {sortedAttr.map(attr => (
                                <Attribute key={attr.id} {...attr} />
                            ))}
                        </div>
                    </div>
                    <div className="cart__action">
                        <button>
                            <Plus />
                        </button>
                        <span>1</span>
                        <button onClick={()=>{removeFromCart(id)}}>
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