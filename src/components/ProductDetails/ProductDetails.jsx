import React, { useEffect, useState } from "react";
import { use } from "react";
import { useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Product from "../Product";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const bidModalRef = useRef(null);
  const [bids, setBids] = useState([]);
  const {
    _id: productId,
    title,
    category,
    price_max,
    price_min,
    created_at,
    seller_image,
    seller_name,
    image,
    condition,
    usage,
    description,
    seller_contact,
    email,
    location,
    status,
  } = useLoaderData(); // gets the JSON data returned by loader

  useEffect(() => {
    fetch(`http://localhost:5000/products/bids/${productId}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId, user]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name?.value;
    const email = e.target.email?.value;
    const bid = e.target.bid?.value;
    console.log(productId, name, email, bid);

    const newBid = {
      Product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded">
      <a href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back To Products
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Image */}
        <div className="bg-gray-200 h-80 rounded-md  space-y-5">
          <img
            src={image}
            alt="image"
            className="h-70 w-80  rounded-md px-5 mt-5"
          />
          {/* Product Description */}
          <div className="bg-white p-4 rounded shadow mt-10">
            <h2 className="font-semibold mb-2">Product Description</h2>
            <p>
              <span className="font-semibold">Condition: </span>
              {condition}
            </p>
            <p>
              <span className="font-semibold">Usage Time: </span>
              {usage}
            </p>
            <p className="mt-2 text-gray-700">{description}</p>
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-2 space-y-5 mb-10">
          <h1 className="text-2xl font-bold">{title}</h1>
          <span className="text-sm px-2 py-1 bg-purple-200 text-purple-800 rounded">
            {category}
          </span>

          <div className="bg-white p-4 rounded shadow mt-4">
            <p className="text-green-600 font-semibold text-lg mt-2">
              ${price_min} - {price_max}
            </p>
            <p className="text-gray-500 text-sm">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="font-semibold mb-2 text-2xl">Product Details</h2>
            <p>
              <span className="font-semibold">Product ID: </span>
              {productId}
            </p>
            <p>
              <span className="font-semibold">Posted: </span>
              {created_at}
            </p>
          </div>

          {/* Seller Information */}
          <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="font-semibold mb-2 text-2xl">Seller Information</h2>
            <div className="flex gap-3 ">
              <img
                src={seller_image}
                alt="image"
                className="bg-gray-200 rounded-full"
              />
              <div>
                <p>
                  <span className="font-semibold"></span>
                  {seller_name}
                </p>
                <p>
                  <span className="font-semibold"></span>
                  {email}
                </p>
              </div>
            </div>
            <p>
              <span className="font-semibold">Location: </span>
              {location}
            </p>
            <p>
              <span className="font-semibold">Contact: </span>
              {seller_contact}
            </p>
            <p>
              <span className="font-semibold">Status: </span>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-lg ">
                {status}
              </span>
            </p>
          </div>

          <button
            onClick={handleBidModalOpen}
            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md hover:opacity-90 transition"
          >
            I Want Buy This Product
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Give Seller Your Offered Price
              </h3>
              <p className="py-4">Offer something seller can not resist</p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    readOnly
                    defaultValue={user?.displayName}
                  ></input>
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    readOnly
                    defaultValue={user?.email}
                  />
                  {/* Bid amount */}
                  <label className="label">Bid</label>
                  <input
                    type="text"
                    name="bid"
                    className="input"
                    placeholder="Your Bid"
                  ></input>
                  <button className="btn btn-neutral mt-4">
                    Place your bid
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      {/* Bid section */}
      <div className="p-6 bg-gray-50 ">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">
          Bids For This Product: {""}
          <span className="text-indigo-600 font-bold">{bids.length}</span>
        </h2>

        <div className="overflow-x-auto bg-white shadow rounded-2xl">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">SL No</th>
                <th className="py-3 px-4 text-left">Buyer Name</th>
                <th className="py-3 px-4 text-left">Buyer Email</th>
                <th className="py-3 px-4 text-left">Bid Price</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Row 1 */}
              {bids.map((bid, index) => (
                <tr className="border-t hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg">
                      <img src={user?.photoURL} alt="" className="rounded-lg" />
                    </div>
                    <p className="font-medium text-gray-800">
                      {bid.buyer_name}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-gray-500 text-sm">
                          {bid.buyer_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">${bid.bid_price}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="px-3 py-1.5 bg-green-100 text-green-700 border border-green-500 rounded-md hover:bg-green-200 transition">
                      Accept Offer
                    </button>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-500 rounded-md hover:bg-red-200 transition">
                      Reject Offer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
