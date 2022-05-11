import React from "react";
import parse from "html-react-parser"
import StoreContext from "Context/storeContext";
import Attribute from "Components/ProductAttribute";
import ServerError from "Components/ServerError"
import Spinner from "Components/spinner";
import Price from "Components/Price";
import LazyImg from "Components/LazyImg";
import withHeader from "Layout/HeaderHoc";
import { sortAttributes, withRouter } from "Lib/utils";
import client from "Apollo/apolloClient";
import { productQuery } from "Apollo/queries";
import 'Styles/product.scss'


// single product component
class Product extends React.Component {
    static contextType = StoreContext;
    constructor(props) {
        super(props);

        this.state = {
            product: null,
            error: false,
            attributeState: {}
        }
    }

    async componentDidMount() {
        try {
            const { id } = this.props.params
            const { data } = await client.query({
                query: productQuery,
                variables: {
                    id: id
                }
            })

            const attributeState = {}

            data.product.attributes.forEach(attr => {
                attributeState[attr.id] = attr.items[0].id
            })

            this.setState({ product: data.product, attributeState })
        } catch (err) {
            this.setState({ error: true })
        }
    }

    // to add item to cart
    cartAddHandle = (id) => {
        // grabbing values of radio button from the form
        this.context.addToCart(id, this.state.attributeState)
    }

    handleAttribute = (name, value) => {
        this.setState({
            attributeState: {
                ...this.state.attributeState,
                [name]: value
            }
        })
    }

    render() {

        if (this.state.error) return < ServerError />
        if (!this.state.product) return <Spinner />

        const { currency } = this.context;
        const { attributeState } = this.state

        const { name, gallery, brand, attributes, prices, description, id, inStock } = this.state.product
        const sortedAttr = sortAttributes(attributes)

        return (
            <main className="product--page page">
                <div className="container">
                    <ProductImages gallery={gallery} name={name} />
                    <div className="product__info">
                        <h2>{brand}</h2>
                        <h1>{name}</h1>
                        <form className="product__attributes" >

                            {sortedAttr.map(attr => (
                                <Attribute key={attr.id} {...attr} handleAttribute={this.handleAttribute} attributeState={attributeState} />
                            ))}
                        </form>
                        <div className="product__price">
                            <h4>Price: </h4>
                            <Price currency={currency.active} prices={prices} />
                        </div>
                        <AddToCart inStock={inStock} cartAddHandle={this.cartAddHandle} id={id} />
                        <div className="product__description">{parse(description)}</div>
                    </div>
                </div>
            </main>);
    }
}

export default withRouter(withHeader(Product));



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





