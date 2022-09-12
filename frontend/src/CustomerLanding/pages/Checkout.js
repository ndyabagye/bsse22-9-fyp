import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const singleProduct = useSelector((state) => state?.cars?.singleCar[0]);
  const price = useSelector((state) => state?.cars?.offer_list.at(-1));
  console.log("Single Product", price);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let Toast = withReactContent(Swal)
  Toast = Swal.mixin({
    position: "top-end",
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_id", singleProduct?.id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("final_price", price);

    const res = await axios.post('http://localhost:8000/product/order', formData);
    console.log( 'aioaiso' , res );
    if (res.status === 200) {
        Toast.fire({
        icon: "success",
        title: "Order Created Successfully!!",
      });
      setTimeout(() => navigate("/"), 1000);
    } else {
      console.log("Res", res);
      Toast.fire({
        icon: "warning",
        title: "Error",
      });
    }
  }
  return (
    <div className="grid grid-cols-8 place-content-center gap-4 px-8 py-4 bg-slate-50 h-screen">
      <div></div>
      <div id="customer" className="flex flex-col space-y-4 col-span-3">
        <form onSubmit={handleSubmit}>
          <div id="customer-info" className="flex flex-col">
            <h1 className="text-3xl">Customer Info</h1>
            <div className="flex flex-col gap-2 shadow-xl bg-gray-200 rounded-md p-6">
              <div className="flex flex-col">
                <label className="text-xl" htmlFor="fname">
                  Name
                </label>
                <input
                  className="outline-none border-none rounded-md "
                  placeholder="Full Name"
                  id="fname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required ={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl" htmlFor="email">
                  Email
                </label>
                <input
                  className="outline-none border-none rounded-md "
                  placeholder="Email Address"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required ={true}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="address" className="text-xl">
                  Address
                </label>
                <input
                  className="outline-none border-none rounded-md "
                  placeholder="Address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  required ={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="outline-none border-none rounded-md "
                  placeholder="Phone Number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  required ={true}
                />
              </div>
          <div className="w-full flex items-center justify-end col-span-2 mt-5">
          <Button type="submit"> Checkout  </Button>
        </div>
            </div>
          </div>
          {/* <div id="payment_info" className="flex flex-col mt-4">
            <h1 className="text-3xl">Payment Info</h1>
            <div className="grid grid-cols-6 gap-2 p-6 rounded-md bg-purple-300">
              <div className="flex  items-center space-x-2">
                <input type="radio" id="card" />
                <label htmlFor="card" className="text-2xl">
                  Card
                </label>
              </div>
              <div className="flex  items-center space-x-2">
                <input type="radio" id="visa" />
                <label htmlFor="visa" className="text-2xl">
                  Visa
                </label>
              </div>
            </div>
          </div> */}
        </form>
      </div>
      <div
        id="summary"
        className="flex flex-col space-y-4  border border-gray-200 shadow-xl rounded-md p-4 col-span-3"
      >
        <h3 className="text-2xl text-center border-b ">Order Summary</h3>
        <div className="grid grid-cols-3">
          <img
            src={"data:image/jpeg;base64," + singleProduct?.image}
            className="h-36 w-full object-cover rounded-sm col-span-1"
            alt=""
          />
          <div className="col-span-2 ml-3 flex flex-col space-y-2">
          <div className="text-2xl border-b">{singleProduct?.brand_id[1]}</div>
          <div className="text-lg text-gray-600 ">Model : {singleProduct?.car_model_id[1]}</div>
          <div className="text-lg text-gray-600 ">Category : {singleProduct?.category_id[1]}</div>
          <div className="text-lg text-gray-600 ">{singleProduct?.brand_id[1]}</div>
          </div>
        </div>
        <div className="border-b">
          <h4 className="text-gray-800 text-xl">Amount to Pay : UGX {numberWithCommas(price)}</h4>
        </div>
      </div>
      <div></div>
    </div>
  );
}
