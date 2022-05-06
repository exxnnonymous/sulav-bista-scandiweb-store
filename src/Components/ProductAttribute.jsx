import React from "react";
export default class Attribute extends React.Component {


    render() {
        const { name, type, items, id, handleAttribute, attributeState } = this.props
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
                                    checked={attributeState[id] === i.id}
                                    value={i.id}
                                    onChange={(e) => { handleAttribute(id, e.target.value) }}
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