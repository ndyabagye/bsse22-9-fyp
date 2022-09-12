import React, { useEffect } from "react";
import Layout from "../../Shared/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  addMessage,
  openChat,
  setCar,
  clearCheckout,
} from "../../data/cars/carsSlice";

import { useGetCarQuery } from "../../data/apiSlice";

import { Launcher } from "../../chat";
import { Button } from "flowbite-react";
import Loader from "../../Shared/Loader";
import Chart from "../components/Chart";

export default function SingleProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: car, isFetching, isSuccess } = useGetCarQuery(params?.id);

  useEffect(() => {
    dispatch(clearCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      console.log("car is", car);
      dispatch(setCar(car));
    }
  }, [dispatch, car, isSuccess]);

  const chatState = useSelector((state) => state.cars);
  const navigateToCheckout = useSelector((state) => state.cars?.checkout);

  useEffect(() => {
    if (navigateToCheckout === true) {
      setTimeout(() => navigate("/checkout"), 2000);
    }
  }, [navigateToCheckout, navigate]);

  function onMessageWasSent(message) {
    const formData = new FormData();
    formData.append("client_response", message.data.text);
    formData.append("old_price_list", chatState.old_price_list);
    formData.append("offer_list", chatState.offer_list);
    formData.append("base_price", chatState.base_price);
    formData.append("selling_price", chatState.selling_price);
    message = {
      author: "me",
      type: "text",
      data: { text: message.data.text },
    };
    console.log("final meesssga e", message);
    dispatch(addMessage(message));
    dispatch(fetchChats(formData));
  }

  function onClick() {
    dispatch(openChat());
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let content;

  if (isFetching) {
    content = (
      <div className="h-full-w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        <div id="image" className="col-span-2">
          <img
            src={"data:image/jpeg;base64," + car[0]?.image}
            className="h-72 w-full object-cover rounded-md"
            alt=""
          />
        </div>
        <div id="details" className="col-span-3 flex justify-start p-2 w-full">
          <div className="flex flex-col">
            <h3 className="text-center text-2xl font-semibold">
              {car[0]?.brand_id[1]},{" "}
              {car[0]?.car_model_id ? car[0].car_model_id[1] : ""}
            </h3>
            <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
              Category :{" "}
              {car[0]?.category_id
                ? car[0]?.category_id[1]
                : "No category registered"}
            </h3>
            <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
              Vendor :{" "}
              {car[0]?.vendor_id
                ? car[0]?.vendor_id[1]
                : "No vendor registered"}
            </h3>
            <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
              Transmission :{" "}
              {car[0]?.transmission
                ? car[0]?.transmission
                : "No transmission registered"}
            </h3>
            <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
              Mileage :{" "}
              {car[0]?.mileage ? car[0]?.mileage : "No mileage registered"}{" "}
              miles
            </h3>
            <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
              Price : UGX{" "}
              {car[0]?.selling_price
                ? numberWithCommas(car[0]?.selling_price)
                : "No price registered"}
            </h3>
            <p className="text-base border-b border-300 py-3">
              {car[0]?.description ? car[0]?.description : "No description"}
              {/* {singleProduct?.description} */}
            </p>
            <div className="py-4 flex space-x-4">
              <Button onClick={onClick}>Negotiate</Button>
              <Link to="/checkout">
                <Button color="purple">Checkout</Button>
              </Link>
              {/* {'navigate ' + navigateToCheckout} */}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <Layout>
      <div className="w-full h-full">
        <Link to="/">
          <Button className="mx-2" gradientMonochrome="cyan">
            Go Back
          </Button>
        </Link>
        <div className="grid grid-cols-5 gap-2 p-2">{content}</div>
        <div id="negotiation" className="flex">
          <Launcher
            agentProfile={{
              teamName: "Auto Trader Chat Bot",
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
            }}
            onMessageWasSent={onMessageWasSent}
            // onFilesSelected={onFilesSelected}
            messageList={chatState.messageList}
            newMessagesCount={chatState.newMessagesCount}
            onClick={onClick}
            isOpen={chatState.isOpen}
            showEmoji
            fileUpload={chatState.fileUpload}
            pinMessage={{
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
              title: "Chat Format",
              text: "Please use a format of Make it {intended price}",
            }}
            placeholder="Type here..."
          />
        </div>
        <Chart />
      </div>
    </Layout>
  );
}
