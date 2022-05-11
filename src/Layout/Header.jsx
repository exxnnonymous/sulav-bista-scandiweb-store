import React from "react";
import { Link, NavLink } from "react-router-dom";
import StoreContext from "Context/storeContext";
import { withRouter } from "Lib/utils";
import CartOverlay from "Components/CartOverlay"
import { Logo, DownArrow, CartIcon } from "Assets/Icons";

import 'Styles/header.scss'

class Header extends React.Component {

  static contextType = StoreContext;

  constructor(props) {
    super(props)
    this.state = {
      cartOpen: false,
      dropdownOpen: false
    }

  }



  // handle category links
  handleLink = (changeCategory, name) => {
    if (window.location.pathname !== "/") {
      this.props.navigate('/')
    }
    changeCategory(name)

  }

  // handle cart menu
  handleCart = () => {
    this.setState(prev => ({
      cartOpen: !prev.cartOpen
    }))
  }

  // close cart menu
  closeCart = () => {
    if (this.state.cartOpen) {
      this.setState({
        cartOpen: false
      })
    }
  };


  // handle price dropdown
  handleDropdown = () => {
    this.setState(prev => ({
      dropdownOpen: !prev.dropdownOpen
    }))
  };

  // close price dropdown
  closeDropdown = () => {
    if (this.state.dropdownOpen) {
      this.setState({
        dropdownOpen: false
      })
    }
  };



  render() {
    const { categories, currency, changeCurrency, cart } = this.context;
    if (!categories && !currency) return ""
    return (
      <header onClick={this.closeCart}>
        <div className="container">
          <nav>
            {categories.map((cat) => (
              <NavLink key={cat.name} to={cat.name === "all" ? "/" : `/${cat.name}`} className={(navData) => (navData.isActive ? 'link-active' : '')} >{cat.name}</NavLink>
            ))}
          </nav>

          <Link className="logo" to="/">
            <Logo />
          </Link>


          <div className="actions">
            <button className={`price__menu ${this.state.dropdownOpen ? "toggled" : ""}`} onBlur={this.closeDropdown}>
              <div className="price__menu-main" onClick={this.handleDropdown}>
                <div className="price">
                  <span>{currency.active.symbol}</span>
                  <span className="icon">
                    <DownArrow />
                  </span>
                </div>
              </div>
              <div className="price__menu-dropdown bg-white">
                <PriceDropdown currencies={currency.type} changeCurrency={changeCurrency} closeDropdown={this.closeDropdown} />
              </div>
            </button>
            <Cart total={cart.totalItems} handleCart={this.handleCart} />
          </div>
        </div>
        <CartOverlay cartOpen={this.state.cartOpen} closeCart={this.closeCart} />
      </header>
    );
  }
}

export default withRouter(Header);





// price dropdown component
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

// cart menu in header component
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