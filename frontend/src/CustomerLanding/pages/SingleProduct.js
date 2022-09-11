import React, { useEffect } from "react";
import Layout from "../../Shared/Layout";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCar, fetchChats,
  incrementMessagesCount,
  addMessage,
  openChat, } from "../../data/cars/carsSlice";

import { Launcher } from "../../chat";
import { Button } from "flowbite-react";
// import Chart from "../components/Chart";

export default function SingleProduct() {
  const params = useParams();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('params', params);
  //   dispatch(fetchSingleCar(params?.id))
  // }, [dispatch, params])

  const singleProduct = useSelector((state) => state?.cars?.singleCar[0]);
  const chatState = useSelector((state) => state.cars);
  const navigateToCheckout = useSelector((state) => state.cars?.checkout);

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
    console.log('final meesssga e', message);
    dispatch(addMessage(message));
    dispatch(fetchChats(formData));
  }

  function onClick() {
    dispatch(openChat());
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <Layout>
      <div className="w-full h-full">
        <Link to="/">
        <Button className="mx-2" gradientMonochrome="cyan">Go Back</Button>
        </Link>
        <div className="grid grid-cols-5 gap-2 p-2">
          <div id="image" className="col-span-2">
            <img
              src={'data:image/jpeg;base64,' + singleProduct?.image}
              className="h-72 w-full object-cover rounded-md"
              alt=""
            />
          </div>
          <div
            id="details"
            className="col-span-3 flex justify-start p-2 w-full"
          >
            <div className="flex flex-col">
              <h3 className="text-center text-2xl font-semibold">
                {singleProduct?.brand_id[1]}, {singleProduct?.car_model_id ? singleProduct.car_model_id[1] : ''}
              </h3>
              <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
                Category : {singleProduct?.category ? singleProduct?.category_id[1] : 'No category registered'}
              </h3>
              <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
                Vendor :  {singleProduct?.vendor_id ? singleProduct?.vendor_id[1] : 'No vendor registered'}
              </h3>
              <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
                Transmission :  {singleProduct?.transmission ? singleProduct?.transmission: 'No transmission registered'}
              </h3>
              <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
                Mileage : {singleProduct?.mileage ? singleProduct?.mileage: 'No mileage registered'} miles
              </h3>
               <h3 className=" text-gray-700 text-base font-normal capitalize py-3 border-b border-gray-300">
                Price : UGX {singleProduct?.selling_price ? numberWithCommas(singleProduct?.selling_price): 'No price registered'}
              </h3>
              <p className="text-base border-b border-300 py-3">
                {singleProduct?.description ? singleProduct?.description : 'No description'}
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
        </div>
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
              title:
                "Chat Format",
              text: "Please use a format of Make it {intended price}",
            }}
            placeholder="Type here..."
          />
        </div>
        {/* <Chart  /> */}

      </div>
    </Layout>
  );
}
