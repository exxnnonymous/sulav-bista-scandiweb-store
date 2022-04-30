import React from "react";
import { Link } from "react-router-dom";
import StoreContext from "Context/storeContext";
import { withRouter } from "Lib/utils";
import { Logo, DownArrow, CartIcon } from "Assets/Icons";

import 'Styles/Header.scss'

class Header extends React.Component {

  static contextType = StoreContext;





  handleLink = (changeCategory, name) => {
    if (window.location.pathname !== "/") {
      this.props.navigate('/')
    }
    changeCategory(name)

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
            <Cart total={cart.totalItems} />
          </div>
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
    const { total } = this.props
    return (
      <button className="cart__menu">
        <div className="icon">
         <CartIcon />
          {total !== 0 && <span>{total}</span>}
        </div>
      </button>
    )
  }
}