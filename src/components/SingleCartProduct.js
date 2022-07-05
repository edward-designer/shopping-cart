import { AiFillDelete } from "react-icons/ai";

import { CartState } from "../context/Context";

const SingleCartProduct = ({ prod }) => {
  const { dispatch } = CartState();
  return (
    <span className="cartitem" key={prod.id}>
      <img src={prod.image} alt={prod.name} className="cartItemImg" />
      <div className="cartItemDetail">
        <span>{prod.name}</span>
        <span>X {prod.qty}</span>
      </div>
      <AiFillDelete
        fontSize="20px"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })}
      />
    </span>
  );
};

export default SingleCartProduct;
