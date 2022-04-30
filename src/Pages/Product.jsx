import React from "react";
import {  sortAttributes, withRouter } from "Lib/utils";
import StoreContext from "Context/storeContext";

import 'Styles/Product.scss'
import Attribute from "Components/ProductAttribute";
import Price from "Components/Price";


class Product extends React.Component {
    static contextType = StoreContext;

    render() {
        const { getProduct,currency } = this.context;
        const { name, gallery, category, attributes, prices,description } = getProduct(this.props.params.id)
        const sortedAttr = sortAttributes(attributes)
        return (
            <main className="product--page">
                <div className="container">
                    <ProductImages gallery={gallery} name={name} />
                    <div className="product__info">
                        <h2>{category}</h2>
                        <h1>{name}</h1>
                        <div className="product__attributes">

                            {sortedAttr.map(attr => (
                                <Attribute key={attr.id} {...attr} />
                            ))}
                        </div>
                        <div className="product__price">
                            <h4>Price: </h4>
                            <Price currency={currency.active} prices={prices}/>
                        </div>
                        <AddToCart />
                        <div className="product__description" dangerouslySetInnerHTML={{__html: description}}></div>
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


class AddToCart extends React.Component{

    render(){

        return (
            <button className="product__cart-btn">
                add to cart
            </button>
        )
    }
}