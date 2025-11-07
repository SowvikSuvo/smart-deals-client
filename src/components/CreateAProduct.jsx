import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CreateProduct = () => {
  const axiosSecure = useAxiosSecure();
  // const axiosInstance = useAxios();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    price_min: "",
    price_max: "",
    email: user.email,
    category: "",
    created_at: new Date(),
    status: "pending",
    location: "",
    seller_image: user.photoURL,
    seller_name: user.displayName,
    condition: "",
    image: "",
    usage: "",
    description: "",
    seller_contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("✅ Product Data:", formData);
    // You can send data using axios.post("/products", formData)

    // axios.post("https://smart-deals-api-server-liard.vercel.app/products", formData).then((data) => {
    //   console.log(data.data);

    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Your Product has been created",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     e.currentTarget.reset();
    //   }
    // });
    // Convert price strings to numbers
    const payload = {
      ...formData,
      price_min: Number(formData.price_min),
      price_max: Number(formData.price_max),
    };

    axiosSecure.post("/products", payload).then((data) => {
      console.log("after secure call ", data.data);

      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Product has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      e.target.reset();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 sm:p-8">
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-indigo-600 text-sm mb-4 flex items-center"
        >
          ← Back To Products
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2">
          Create <span className="text-indigo-600 font-bold">A Product</span>
        </h2>
        <div className="h-1 w-16 bg-indigo-500 mx-auto rounded-full mb-6"></div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Title */}
          <div>
            <label className="font-medium text-gray-700">Title</label> <br />
            <input
              type="text"
              name="title"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          {/* Category */}
          <div>
            <label className="font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="Select a Category">Select a Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="vehicles">Vehicles</option>
              <option value="fashion">Fashion</option>
              <option value="others">Others</option>
            </select>
          </div>
          {/* Price */}
          <div>
            <label className="font-medium text-gray-700">
              Min Price You want to Sale ($)
            </label>
            <input
              type="number"
              name="price_min"
              placeholder="e.g. 18.5"
              value={formData.price_min}
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, price_min: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Max Price You want to Sale ($)
            </label>
            <input
              type="number"
              name="price_max"
              placeholder="Optional (default = Min Price)"
              value={formData.price_max}
              className="input"
              onChange={
                (e) => setFormData({ ...formData, price_max: e.target.value }) // ✅ Corrected
              }
              required
            />
          </div>

          {/* Product Condition */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 col-span-1 sm:col-span-2">
            <label className="font-medium text-gray-700">
              Product Condition:
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="condition"
                  value="brandNew"
                  required
                  checked={formData.condition === "brandNew"}
                  onChange={handleChange}
                />
                <span>Brand New</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  required
                  checked={formData.condition === "used"}
                  onChange={handleChange}
                />
                <span>Used</span>
              </label>
            </div>
          </div>
          {/* Usage Time */}
          <div>
            <label className="font-medium text-gray-700">
              Product Usage time
            </label>
            <input
              type="text"
              name="usage"
              placeholder="e.g. 1 year 3 month"
              value={formData.usage}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          {/* Product Image URL */}
          <div>
            <label className="font-medium text-gray-700">
              Your Product Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="Your Product Image URL"
              value={formData.image}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          {/* Seller Details */}
          <div>
            <label className="font-medium text-gray-700">Seller Name</label>
            <input
              type="text"
              name="seller_name"
              placeholder="e.g. Artisan Roasters"
              value={formData.seller_name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Seller Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Seller Contact</label>
            <input
              type="text"
              name="seller_contact"
              placeholder="e.g. +1-555-1234"
              value={formData.seller_contact}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Seller Image URL
            </label>
            <input
              type="url"
              name="seller_image"
              placeholder="Seller Image URL"
              value={formData.seller_image}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          {/* Location */}
          <div>
            <label className="font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleChange}
              className="input sm:col-span-2"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="font-medium text-gray-700">
              Simple Description about your Product
            </label>
            <textarea
              name="description"
              placeholder="Simple Description about your Product"
              value={formData.description}
              onChange={handleChange}
              className="input sm:col-span-2 h-28 resize-none"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="sm:col-span-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Create A Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
