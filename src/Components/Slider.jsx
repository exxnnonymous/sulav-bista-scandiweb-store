import React from "react"
import { LeftArrow, RightArrow } from "Assets/Icons"
import "Styles/Slider.scss"


export default class Slider extends React.Component {

    state = {
        slideIndex: 1
    }


    nextSlide = () => {
        const { slideIndex } = this.state
        const { images } = this.props
        if (slideIndex !== images.length) {
            this.setState({ slideIndex: slideIndex + 1 })
        }
        else if (slideIndex === images.length) {
            this.setState({ slideIndex: 1 })
        }
    }

    prevSlide = () => {
        const { slideIndex } = this.state
        const { images } = this.props
        if (slideIndex !== 1) {
            this.setState({ slideIndex: slideIndex - 1 })
        }
        else if (slideIndex === 1) {
            this.setState({ slideIndex: images.length })
        }
    }


    render() {
        const { images, alt } = this.props
        const { slideIndex } = this.state
        return (
            <div className="slider__container">
                {images.map((img, idx) => {
                    return (
                        <div key={img} className={slideIndex === idx + 1 ? "slide active__slide" : "slide"}>
                            <img

                                src={img}
                                alt={alt + "-" + idx}
                            />
                        </div>
                    )
                })}
                
                <BtnSlider moveSlide={this.prevSlide} direction={"prev"}/>
                <BtnSlider moveSlide={this.nextSlide} direction={"next"}/>
            </div>
        )
    }
}



class BtnSlider extends React.Component {
    render() {
        const { direction, moveSlide } = this.props
        return (
            <button onClick={moveSlide} className={direction === "next" ? "btn__slide next" : "btn__slide prev"} >
                {direction === "next" ?
                    <RightArrow /> : <LeftArrow />
                }
            </button>
        )
    }
}