import React, { useState, useEffect } from "react";
import { Button, Col, Form, ListGroup, Row, Image } from "react-bootstrap";

import { CartState } from "../context/Context";

import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
    );
  }, [cart]);

  console.log(cart);

  return (
    <div className="cart">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} />
                </Col>
                <Col md={3}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>
                  <span>${prod.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={prod.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_QUANTITY",
                        payload: { ...prod, qty: e.target.value },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={1}>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: prod })
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="total">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontwwight: 700, fontSize: 20 }}>Total: $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
