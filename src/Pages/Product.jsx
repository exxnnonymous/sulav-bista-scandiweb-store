import React from "react";
import { withRouter } from "Lib/utils";
import StoreContext from "Context/storeContext";

import 'Styles/Product.scss'


class Product extends React.Component {
    static contextType = StoreContext;

    render() {
        const { getProduct } = this.context;
        const { name, gallery, category, attributes } = getProduct(this.props.params.id)
        return (
            <main className="product--page">
                <div className="container">
                    <ProductImages gallery={gallery} name={name} />
                    <div className="product__info">
                        <h2>{category}</h2>
                        <h1>{name}</h1>
                        {attributes.map(attr => (
                            <div key={attr.id} className="product__attributes">
                                <Attribute {...attr} />
                            </div>
                        ))}
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
            console.log(index)
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


class Attribute extends React.Component {



    render() {
        const { name, type, items } = this.props
        
        return (
            <div className="product__attribute">
                <h6>{name}:</h6>
                {type === "text" && (
                    <div className="product__attribute-size">
                        {
                            items.map(i => (
                                <div key={i.id}>
                                    {i.value}
                                </div>
                            ))
                        }
                    </div>
                )}

            </div>
        )
    }
}