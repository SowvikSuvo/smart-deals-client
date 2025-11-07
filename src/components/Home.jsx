import React from "react";
import LatestProducts from "./LatestProducts";

const latestProductsPromise = fetch(
  "https://smart-deals-api-server-liard.vercel.app/latest-product"
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
