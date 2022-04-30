
import React from "react";


export default class Attribute extends React.Component {

    state = {
        value: this.props.items[0].id
    }

    handleRadioBtn = (e) => {
        this.setState({ value: e.target.value })
    }

    render() {
        const { name, type, items, id } = this.props
        const { value } = this.state
        return (
            <div className="product__attribute">
                <h6>{name}:</h6>
                <div className={`product__attribute-${type === "swatch" ? "color" : "text"}`}>
                    {items.map(i => {

                        const style = type === "swatch" ? { "--color": i.value } : null
                        return (
                            <div key={i.id} className="input__wrapper" style={style}>
                                <input
                                    type="radio"
                                    name={"attribute-" + id} id={i.id + id}
                                    checked={value === i.id}
                                    value={i.id}
                                    onChange={this.handleRadioBtn}
                                />
                                <label htmlFor={i.id + id}>
                                    {type === "text" && i.value}
                                </label>
                            </div>
                        )
                    })
                    }

                </div>
            </div>
        )
    }

}