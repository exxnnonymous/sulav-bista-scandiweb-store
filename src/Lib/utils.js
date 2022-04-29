import { useNavigate, useParams } from "react-router-dom";

export const filterPrice = (prices, currency) => {
  return prices.filter((price) => price.currency.label === currency.label)[0];
};


export function withRouter( Child ) {
  return ( props ) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Child { ...props } params ={ params } navigate={navigate}/>;
  }
}


