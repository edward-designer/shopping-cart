import {
  Navbar,
  Container,
  FormControl,
  Nav,
  Dropdown,
  Badge,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
import { TbConfetti } from "react-icons/tb";

import { CartState, ProductState } from "../context/Context";

import SingleCartProduct from "./SingleCartProduct";

const Header = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const {
    productState: { searchQuery },
    productDispatch,
  } = ProductState();
  const cartCount = cart.reduce((acc, item) => acc + Number(item.qty), 0);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 36,
              fontFamily: "Gruppo",
            }}
          >
            <TbConfetti
              style={{
                color: "darkgreen",
                position: "relative",
                top: "-0.25em",
                display: "inline-block",
              }}
            />
            easySHOP
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500, maxWidth: "100%" }}
            placeholder="Search for products"
            className="m-auto"
            value={searchQuery}
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>

        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="transparent">{cartCount}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370, right: 0, left: "auto" }}>
              {cartCount ? (
                <>
                  {cart.map((prod) => (
                    <SingleCartProduct prod={prod} key={prod.id} />
                  ))}
                  <Link to="/cart" style={{ display: "flex" }}>
                    <Button style={{ flex: 1, margin: "5px" }}>
                      Go to Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
