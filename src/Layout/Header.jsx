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
    cartOpen: false
  }


  handleLink = (changeCategory, name) => {
    if (window.location.pathname !== "/") {
      this.props.navigate('/')
    }
    changeCategory(name)

  }

  handleCart = () => {
    this.setState(prev => ({
      cartOpen: !prev.cartOpen
    }))
  }




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

          <Link className="logo" to="/cart">
            <Logo />
          </Link>


          <div className="actions">
            <button className="price__menu">
              <div className="price__menu-main">
                <div className="price">
                  <span>{currency.active.symbol}</span>
                  <span className="icon">
                    <DownArrow />
                  </span>
                </div>
              </div>
              <div className="price__menu-dropdown">
                <PriceDropdown currencies={currency.type} changeCurrency={changeCurrency} />
              </div>
            </button>
            <Cart total={cart.totalItems} handleCart={this.handleCart} />
          </div>
          <CartOverlay open={this.state.cartOpen} />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);


class PriceDropdown extends React.Component {



  render() {
    const { currencies, changeCurrency } = this.props
    return (
      <ul>
        {currencies.map(currency => (
          <li key={currency.label} onClick={() => { changeCurrency(currency.label) }}>{currency.symbol} {currency.label}</li>
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