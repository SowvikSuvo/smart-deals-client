import React from "react";
import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const axiosSecure = useAxiosSecure();

  // console.log("token", user.accessToken);

  useEffect(() => {
    axiosSecure.get(`/bids?email=${user.email}`).then((data) => {
      setBids(data.data);
    });
  }, [user, axiosSecure]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://smart-deals-api-server-liard.vercel.app/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-api-server-liard.vercel.app/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });

              //
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      {/* <!-- Header --> */}
      <div class="bg-white border border-gray-300 rounded-t-lg px-6 py-4">
        <h1 class="text-xl text-center font-semibold text-gray-900">
          My Bids: <span class="text-blue-600">{bids.length}</span>
        </h1>
      </div>

      {/* <!-- Table Container for Mobile Scroll --> */}
      <div class="table-container bg-white border-x border-b border-gray-300 rounded-b-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 hidden sm:table-header-group">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sl. No
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bid Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {/* <!-- Row 1 --> */}
            {bids.map((bid, index) => (
              <tr
                key={bid._id}
                class="flex flex-col sm:table-row border-b sm:border-none"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium sm:text-center">
                  {index + 1}
                </td>
                <td class="px-6 py-4 flex items-center gap-3 sm:table-cell">
                  <div class="bg-gray-200 border-2 border-dashed rounded w-12 h-12 flex-shrink-0"></div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      Orange Juice
                    </div>
                    <div class="text-xs text-gray-500 sm:hidden">$12.5</div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 sm:table-cell">
                  <div class=" rounded w-10 h-10 ">
                    <img src={user.photoURL} alt="" className="rounded-full" />
                  </div>

                  <div class="flex flex-col">
                    <span>{bid.buyer_name}</span>
                    <span class="text-xs text-gray-400">{bid.buyer_email}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900 hidden sm:table-cell">
                  ${bid.bid_price}
                </td>
                <td class="px-6 py-4 hidden sm:table-cell">
                  {bid.status === "pending" ? (
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-yellow-800">
                      {bid.status}
                    </span>
                  ) : (
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-400 text-green-800">
                      {bid.status}
                    </span>
                  )}
                </td>
                <td class="px-6 py-4 text-sm hidden sm:table-cell">
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    class="text-red-600 hover:text-red-800 text-sm font-medium outline p-1 rounded"
                  >
                    Remove Bid
                  </button>
                </td>
                {/* <!-- Mobile Actions --> */}
                <td class="px-6 py-4 flex justify-between items-center sm:hidden text-sm">
                  <div class="flex items-center gap-3">
                    <span class="font-semibold text-gray-900">
                      {" "}
                      ${bid.bid_price}
                    </span>
                    {bid.status === "pending" ? (
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-yellow-800">
                        {bid.status}
                      </span>
                    ) : (
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-400 text-green-800">
                        {bid.status}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    class="text-red-600 hover:text-red-800 font-medium outline  rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
