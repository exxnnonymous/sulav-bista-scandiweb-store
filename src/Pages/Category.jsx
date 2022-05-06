import React from "react";
import StoreContext from "Context/storeContext";
import ProductItem from "Components/ProductItem";
import ServerError from "Components/ServerError"
import Spinner from "Components/spinner";
import withHeader from "Layout/HeaderHoc";
import { withRouter } from "Lib/utils";
import client from "Apollo/apolloClient";
import { categoryQuery } from "Apollo/queries"
import "Styles/category.scss"

class Category extends React.Component {
    static contextType = StoreContext;

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: false,

        }
        document.title = `Scandiweb Store`
    }

    fetchCategory = async (category) => {
        try {
            const { data } = await client.query({
                query: categoryQuery,
                variables: {
                    title: category
                }
            })
            this.setState({ data: data.category })

        } catch (err) {
            this.setState({ error: true })
        }


    }

    async componentDidMount() {
        const { category } = this.props.params
        await this.fetchCategory(category || "all")

    }

    async componentDidUpdate() {
        const { category } = this.props.params
        const { data } = this.state

        if (data && data.name !== (category || "all")) {
            await this.fetchCategory(category || "all")
        }
    }



    render() {

        if (this.state.error) return <ServerError />
        if (!this.state.data) return <Spinner />
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



