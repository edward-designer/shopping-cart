import { createContext, useContext, useReducer } from "react";

import { cartReducer, productReducer } from "./Reducers";

/* to populate dummy data */
import { faker } from "@faker-js/faker";
faker.seed(99);
const products = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.food(320, 240, true),
  inStock: Math.floor(Math.random() * 10),
  fastDelivery: faker.datatype.boolean(),
  rating: Math.ceil(Math.random() * 5),
}));
/* END:to populate dummy data */

const Cart = createContext();
const Product = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    sort: "",
  });

  return (
    <Product.Provider value={{ productState, productDispatch }}>
      <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>
    </Product.Provider>
  );
};
export default Context;

export const CartState = () => {
  return useContext(Cart);
};
export const ProductState = () => {
  return useContext(Product);
};
