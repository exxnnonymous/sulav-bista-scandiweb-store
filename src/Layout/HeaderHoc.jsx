import React from "react"
import Header from "./Header"

export default function withHeader(Component) {

    return class extends React.Component {

        render() {
            return (<>
                <Header />
                <Component {...this.props} />
            </>)
        }
    }
}