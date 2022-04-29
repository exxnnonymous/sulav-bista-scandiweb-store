import StoreContext from "Context/storeContext";
import React from "react";

class Header extends React.Component {
  static contextType = StoreContext;
  render() {
    const { categories } = this.context;
    return (
      <header>
        <nav>
          {categories.map((category) => (
            <span key={category.name}>{category.name}</span>
          ))}
        </nav>
      </header>
    );
  }
}

export default Header;
