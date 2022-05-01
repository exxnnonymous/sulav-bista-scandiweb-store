import React from "react"



export default class LazyImg extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
        }
    }

    handleImageLoaded = () => {
        this.setState({ imageLoaded: true });
    }

    render() {
        const { src, alt, className, onClick } = this.props
        return (
            <div >
                {!this.state.imageLoaded &&
                    <div className={`skeleton ${className ? className : ""}`}>

                    </div>
                }

                <img src={src} alt={alt} onLoad={this.handleImageLoaded} onClick={onClick && onClick} />
            </div>
        )
    }
}