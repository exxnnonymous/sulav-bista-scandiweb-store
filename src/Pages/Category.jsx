import React from "react";
import StoreContext from "Context/storeContext";

import "Styles/Category.scss"
import ProductItem from "Components/ProductItem";

class Category extends React.Component {
    static contextType = StoreContext;


    render() {

        const { category, getProductsByCategory, currency } = this.context;
        const products = getProductsByCategory(category.active.name)

        return (<main className="category--page">
            <div className="container">
                <h1>
                    {category.active.name}
                </h1>

                <div className="products__container">
                    {products ? products.map(product => (
                        <ProductItem key={product.id} product={product} currency={currency.active} />
                    )) : "No products!"}
                </div>
            </div>
        </main>);
    }
}

export default Category;



