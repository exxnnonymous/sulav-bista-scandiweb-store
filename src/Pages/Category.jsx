import React from "react";
import StoreContext from "Context/storeContext";

import ProductItem from "Components/ProductItem";
import "Styles/category.scss"
import withHeader from "Layout/HeaderHoc";
import { withRouter } from "Lib/utils";
import client from "Apollo/apolloClient";
import { categoryQuery } from "Apollo/queries"

class Category extends React.Component {
    static contextType = StoreContext;

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: false,

        }
        const { category } = this.props.params
        document.title = `${category[0].toUpperCase() + category.substring(1)} - Scandiweb Store`
    }

    fetchCategory = async (category) => {
        try {

            const { getCategory, cacheCategory } = this.context

            const cachedData = getCategory(category)
            if (cachedData) {
                this.setState({ data: cachedData })
                return
            }

            const { data } = await client.query({
                query: categoryQuery,
                variables: {
                    title: category

                }
            })
            this.setState({ data: data.category })
            cacheCategory(data.category)

        } catch (err) {
            this.setState({ error: true })
        }


    }

    async componentDidMount() {
        const { category } = this.props.params
        await this.fetchCategory(category)

    }

    async componentDidUpdate() {
        const { category } = this.props.params
        const { data } = this.state

        if (data && data.name !== category) {
            await this.fetchCategory(category)
        }
    }



    render() {

        if (this.state.error) return <div>Error...</div>
        if (!this.state.data) return <div>Loading...</div>
        const { currency, addToCart } = this.context;
        const { name, products } = this.state.data
        return (
            <main className="category--page page">
                <div className="container">
                    <h1>
                        {name}
                    </h1>

                    <div className="products__container">
                        {products ? products.map(product => (
                            <ProductItem key={product.id} product={product} currency={currency.active} addToCart={addToCart} />
                        )) : "No products!"}
                    </div>
                </div>
            </main>);
    }
}

export default withRouter(withHeader(Category));



