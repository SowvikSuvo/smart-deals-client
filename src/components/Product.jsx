import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { title, price_min, price_max, image, _id } = product;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt="image"
          className="rounded-xl object-cover w-90 h-60"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p>
          Price: ${price_min} - ${price_max}
        </p>

        <div className="card-actions w-full justify-center">
          <Link
            to={`/productDetails/${_id}`}
            className=" btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
