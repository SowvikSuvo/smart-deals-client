import React from "react";
import LatestProducts from "./LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:5000/latest-product"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <h1 className="bg-primary">this is home</h1>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
