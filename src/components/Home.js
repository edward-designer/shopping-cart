import { CartState, ProductState } from "../context/Context";

import SingleProduct from "./SingleProduct";

import Filter from "./Filter";

const Home = () => {
  const {
    state: { products },
  } = CartState();
  const {
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = ProductState();

  const displayProducts = () => {
    let sortedProducts = [...products];
    !byStock &&
      (sortedProducts = sortedProducts.filter((prod) => prod.inStock));
    sort === "lowToHigh" &&
      (sortedProducts = sortedProducts.sort((a, b) => a.price - b.price));
    sort === "highToLow" &&
      (sortedProducts = sortedProducts.sort((a, b) => b.price - a.price));
    byFastDelivery &&
      (sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery));
    sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    searchQuery &&
      (sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    return sortedProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {displayProducts().map((prod) => (
          <SingleProduct key={prod.id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default Home;
