import React from "react";
import { sortAttributes, withRouter } from "Lib/utils";
import StoreContext from "Context/storeContext";

import Attribute from "Components/ProductAttribute";
import Price from "Components/Price";
import LazyImg from "Components/LazyImg";
import 'Styles/product.scss'


// single product component
class Product extends React.Component {
    static contextType = StoreContext;
    constructor() {
        super();
        document.title = "Scandiweb Store"
        this.formRef = React.createRef();
    }

// to add item to cart
    cartAddHandle = (id) => {
        // grabbing values of radio button from the form
        const values = []
        Array.from(this.formRef.current).forEach(item => { if (item.checked) { values.push(item.value) } })
        this.context.addToCart(id, values)
    }

    render() {
        const { getProduct, currency, cart } = this.context;
        const { name, gallery, brand, attributes, prices, description, id, inStock } = getProduct(this.props.params.id)
        const sortedAttr = sortAttributes(attributes)
        return (
            <main className="product--page page">
                <div className="container">
                    <ProductImages gallery={gallery} name={name} />
                    <div className="product__info">
                        <h2>{brand}</h2>
                        <h1>{name}</h1>
                        <form className="product__attributes" ref={this.formRef} >

                            {sortedAttr.map(attr => (
                                <Attribute key={attr.id} {...attr} />
                            ))}
                        </form>
                        <div className="product__price">
                            <h4>Price: </h4>
                            <Price currency={currency.active} prices={prices} />
                        </div>
                        <AddToCart inStock={inStock} cartAddHandle={this.cartAddHandle} id={id} items={cart.items} />
                        <div className="product__description" dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                </div>
            </main>);
    }
}

export default withRouter(Product);



// product images gallery component
class ProductImages extends React.Component {
    state = {
        activeImg: this.props.gallery[0]
    }

    changeImg = (index) => {
        const { gallery } = this.props
        if (gallery.indexOf(this.state.activeImg) !== index) {
            this.setState({ activeImg: gallery[index] })
        }
    }

    render() {
        const { gallery, name } = this.props
        const { activeImg } = this.state
        return (
            <div className="product__images">
                <div className="product__images-gallery">
                    {gallery.map((url, index) => (
                        <LazyImg key={url} src={url} alt={name} onClick={() => { this.changeImg(index) }} />
                    ))}
                </div>
                <div className="product__images-main">
                    <LazyImg src={activeImg} alt={name} />
                </div>
            </div>
        )
    }
}

// add to cart button
class AddToCart extends React.Component {

    render() {
        const { cartAddHandle, inStock, id } = this.props
        return (
            <button className={`product__cart-btn ${!inStock ? "btn-disabled" : ""}`} onClick={() => {
                if (inStock) {
                    cartAddHandle(id)
                }
            }} >
                {!inStock ? "out of stock" : "add to cart"}
            </button>
        )
    }
}





