import React from "react";
import { sortAttributes, withRouter } from "Lib/utils";
import StoreContext from "Context/storeContext";

import 'Styles/Product.scss'
import Attribute from "Components/ProductAttribute";
import Price from "Components/Price";


class Product extends React.Component {
    static contextType = StoreContext;


    formRef = React.createRef();

    cartAddHandle = (id) => {
        const values = []
        Array.from(this.formRef.current).forEach(item => { if (item.checked) { values.push(item.value) } })
        this.context.addToCart(id, values)
    }

    render() {
        const { getProduct, currency, cart } = this.context;
        const { name, gallery, brand, attributes, prices, description, id, inStock } = getProduct(this.props.params.id)
        const sortedAttr = sortAttributes(attributes)
        return (
            <main className="product--page">
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
                        <img key={url} src={url} alt={name} onClick={() => { this.changeImg(index) }} />

                    ))}
                </div>
                <div className="product__images-main">
                    <img src={activeImg} alt={name} />
                </div>
            </div>
        )
    }
}


class AddToCart extends React.Component {

    render() {
        const { cartAddHandle, inStock, id, items } = this.props
        const added = !!(items.find(item => item.id === id));
        const btnDisable = !!(added || !inStock)
        return (
            <button className={`product__cart-btn ${btnDisable ? "btn-disabled" : ""}`} onClick={() => {
                if (inStock && !added) {
                    cartAddHandle(id)
                }
            }} >
                {!inStock ? "out of stock" : added ? "added to cart" : "add to cart"}
            </button>
        )
    }
}





