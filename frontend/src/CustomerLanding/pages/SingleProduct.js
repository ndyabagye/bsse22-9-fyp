import React, { useEffect, useState } from "react";
import Layout from "../../Shared/Layout";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  incrementMessagesCount,
  addMessage,
  openChat,
} from "../../data/chat/chatSlice";
import { Launcher } from "../../chat";
import { setSelectedCar } from "../../data/cars/carsSlice";
import { Button } from "flowbite-react";

export default function SingleProduct() {
  const params = useParams();
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => {
    const allCars = state?.cars?.cars;
    // console.log("params", params.id);
    const singleCar = allCars.find(
      (car) => Number(car.id) === Number(params.id)
    );
    return singleCar;
  });

  useEffect(() => {
    dispatch(setSelectedCar(singleProduct));
  }, [dispatch, singleProduct]);

  const chatState = useSelector((state) => state.chats);
  console.log("Chat State", chatState);

  // useEffect(()=> {
  //   const initialFormData = new FormData();
  //   initialFormData.append('client_response', '');
  //   initialFormData.append('old_price_list', 0);
  //   initialFormData.append('offer_list', 0);
  //   initialFormData.append('base_price', 70000);
  //   initialFormData.append('selling_price', 100000);
  //   dispatch(fetchChats(initialFormData))
  // },[dispatch]);

  const [state, setState] = useState({
    messageList: [],
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: true,
  });

  console.log("state", state);

  function onMessageWasSent(message) {
    console.log("Chat state message", message);
    // console.log('message is', message);
    const formData = new FormData();
    formData.append("client_response", message.data.text);
    formData.append("old_price_list", chatState.old_price_list);
    formData.append("offer_list", chatState.offer_list);
    // product base price
    formData.append("base_price", chatState.base_price);
    // product selling price
    formData.append("selling_price", chatState.selling_price);
    message = {
      author: "me",
      type: "text",
      data: { text: message.data.text },
    };
    dispatch(addMessage(message));
    dispatch(fetchChats(formData));
  }

  // function onMessageWasSent(message) {
  //   setState((state) => ({
  //     ...state,
  //     messageList: [...state.messageList, message],
  //   }));
  // }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState((state) => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          },
        },
      ],
    }));
  }

  function sendMessage(text) {
    console.log("text", text);
    if (text.length > 0) {
      incrementMessagesCount();
      const formData = new FormData();
      formData.append("client_response", text);
      formData.append("old_price_list", text);
      formData.append("offer_list", text);
      formData.append("base_price", text);
      formData.append("selling_price", text);
      dispatch(fetchChats(formData));
    }
  }
  // function sendMessage(text) {
  //   if (text.length > 0) {
  //     const newMessagesCount = state.isOpen
  //       ? state.newMessagesCount
  //       : state.newMessagesCount + 1;

  //     setState((state) => ({
  //       ...state,
  //       newMessagesCount: newMessagesCount,
  //       messageList: [
  //         ...state.messageList,
  //         {
  //           author: "them",
  //           type: "text",
  //           data: { text },
  //         },
  //       ],
  //     }));
  //   }
  // }

  function onClick() {
    dispatch(openChat());
  }
  // function onClick() {
  //   setState((state) => ({
  //     ...state,
  //     isOpen: !state.isOpen,
  //     newMessagesCount: 0,
  //   }));
  // }

  // console.log("Single Product", singleProduct);

  return (
    <Layout>
      <div className="w-full h-full">
        <Link to="/">
        <Button className="mx-2" gradientMonochrome="cyan">Go Back</Button>
        </Link>
        <div className="grid grid-cols-5 gap-2 p-2">
          <div id="image" className="col-span-2">
            <img
              src={singleProduct.img_url}
              className="h-full w-full object-cover rounded-md"
              alt=""
            />
          </div>
          <div
            id="details"
            className="col-span-3 flex justify-start p-2 w-full"
          >
            <div className="flex flex-col w-full">
              <h3 className=" text-gray-700 text-3xl font-normal capitalize pb-5 border-b border-gray-300">
                {singleProduct.make}
              </h3>
              <h3 className=" text-gray-700 text-2xl font-normal capitalize py-3 border-b border-gray-300">
                {singleProduct.model}
              </h3>
              <h3 className=" text-gray-700 text-2xl font-normal capitalize py-3 border-b border-gray-300">
                {singleProduct.year}
              </h3>
              <p className="text-base border-b border-300 py-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                ipsam aliquid eaque ullam quaerat laboriosam magni, eum
                explicabo distinctio ea, mollitia, officia quod in. Magnam hic
                repellendus nemo ratione ad.
              </p>
              <div className="py-4 flex space-x-4">
                <Button>Add To Cart</Button>
                <Link to="/checkout">
                <Button color="purple">Checkout</Button>
                </Link>
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
            onFilesSelected={onFilesSelected}
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
      </div>
    </Layout>
  );
}
