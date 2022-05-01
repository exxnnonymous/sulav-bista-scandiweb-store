import React from "react";
import { Link } from "react-router-dom";
import StoreContext from "Context/storeContext";
import { withRouter } from "Lib/utils";
import { Logo, DownArrow, CartIcon } from "Assets/Icons";
import CartOverlay from "Components/CartOverlay"

import 'Styles/Header.scss'

class Header extends React.Component {

  static contextType = StoreContext;


  state = {
    showCart: false,
    showPrice: false
  }


  handleLink = (changeCategory, name) => {
    if (window.location.pathname !== "/") {
      this.props.navigate('/')
    }
    changeCategory(name)

  }

  // handle price dropdown
  handleCart = () => {
    if (!this.state.showCart) {
      document.addEventListener("click", this.closeCart, false);
    } else {
      document.removeEventListener("click", this.closeCart, false);
    }

    this.setState(prevState => ({
      showCart: !prevState.showCart
    }));
  }

  closeCart = (e) => {
   
    if ((!e.target.closest('.cart__menu') && !e.target.closest('.cart__box')) || e.target.closest('.cart__links')) this.handleCart();
  };


  // handle price dropdown
  handleDropdown = () => {
    if (!this.state.showPrice) {
      document.addEventListener("click", this.closeDropdown, false);
    } else {
      document.removeEventListener("click", this.closeDropdown, false);
    }

    this.setState(prevState => ({
      showPrice: !prevState.showPrice
    }));
  };

  closeDropdown = e => {
    if (!e || !this.node.contains(e.target)) this.handleDropdown();
  };



  render() {
    const { category, currency, changeCurrency, changeCategory, cart } = this.context;
    return (
      <header>
        <div className="container">
          <nav>
            {category.type.map((cat) => (
              <button key={cat.name} className={cat.name === category.active.name ? "link-active" : ""} onClick={() => {
                this.handleLink(changeCategory, cat.name)
              }} >{cat.name}</button>
            ))}
          </nav>

          <Link onClick={()=>{
           changeCategory("all")
          }} className="logo" to="/">
            <Logo />
          </Link>


          <div className="actions">
            <button ref={node => {
              this.node = node;
            }} className={`price__menu ${this.state.showPrice ? "toggled" : ""}`} >
              <div className="price__menu-main" onClick={this.handleDropdown}>
                <div className="price">
                  <span>{currency.active.symbol}</span>
                  <span className="icon">
                    <DownArrow />
                  </span>
                </div>
              </div>
              <div className="price__menu-dropdown">
                <PriceDropdown currencies={currency.type} changeCurrency={changeCurrency} closeDropdown={this.closeDropdown} />
              </div>
            </button>
            <Cart total={cart.totalItems} handleCart={this.handleCart} />
          </div>
          <CartOverlay open={this.state.showCart} />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);


class PriceDropdown extends React.Component {



  render() {
    const { currencies, changeCurrency, closeDropdown } = this.props
    return (
      <ul>
        {currencies.map(currency => (
          <li key={currency.label} onClick={() => { closeDropdown(); changeCurrency(currency.label) }}>{currency.symbol} {currency.label}</li>
        ))}
      </ul>
    )
  }
}


class Cart extends React.Component {

  render() {
    const { total, handleCart } = this.props
    return (
      <button className="cart__menu" onClick={handleCart}>
        <div className="icon">
          <CartIcon />
          {total !== 0 && <span>{total}</span>}
        </div>
      </button>
    )
  }
}