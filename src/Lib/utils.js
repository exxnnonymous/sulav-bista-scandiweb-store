import { useNavigate, useParams } from "react-router-dom";

export const filterPrice = (prices, currency) => {
  return prices.filter((price) => price.currency.label === currency.label)[0];
};

export function withRouter(Child) {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Child {...props} params={params} navigate={navigate} />;
  };
}

export const sortAttributes = (arr) => {
  const index = arr.indexOf(arr.find((a) => a.id === "Color"));
  if(index===-1) return arr
  const last = arr.length - 1;
  const newArr = [...arr];
  if (index !== last) {
    const temp = newArr[index];
    newArr[index] = newArr[last];
    newArr[last] = temp;
  }
  return newArr
};


export const totalPrice = (products, currency) =>{
  const totalPrice = products.reduce((total, item)=>{
    const price = item.prices.find(i=>i.currency.label === currency.label)
    return total + (price.amount * item.quantity)
  },0)
  return totalPrice
} 