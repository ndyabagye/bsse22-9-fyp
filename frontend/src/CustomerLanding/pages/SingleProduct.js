import React, {useEffect, useState } from "react";
import Layout from "../../Shared/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, incrementMessagesCount, addMessage, openChat } from "../../data/chat/chatSlice";
import { Launcher } from "../../chat";

export default function SingleProduct() {
  const params = useParams();

  const singleProduct = useSelector((state) => {
    const allCars = state?.cars?.cars;
    // console.log("params", params.id);
    return allCars.find((car) => Number(car.id) === Number(params.id));
  });

  const chatState = useSelector((state)=> state.chats);
  console.log('Chat State', chatState)
  const dispatch = useDispatch();

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

  console.log('state', state);

  function onMessageWasSent(message) {
    // console.log('message is', message);
    const formData = new FormData();
    formData.append('client_response', message.data.text);
    formData.append('old_price_list', 0);
    formData.append('offer_list', 0);
    // product base price
    formData.append('base_price', 70000);
    // product selling price
    formData.append('selling_price', 100000);
    message= {
      author: 'me',
      type:'text',
      data:message.data.text
    }
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

  function sendMessage(text){
    console.log('text', text)
    if(text.length > 0){
      incrementMessagesCount();
      const formData = new FormData();
      formData.append('client_response', text);
      formData.append('old_price_list', text);
      formData.append('offer_list', text);
      formData.append('base_price', text);
      formData.append('selling_price', text);
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

  function onClick(){
    dispatch(openChat())
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
        <div className="grid grid-cols-3 gap-2 bg-gray-300 p-2">
          <div id="image" className="col-span-1 ">
            <img
              src={singleProduct.img_url}
              className="h-full w-full object-cover rounded-md"
              alt=""
            />
          </div>
          <div
            id="details"
            className="col-span-2 bg-red-400 flex justify-start p-2"
          >
            <div className="flex flex-col">
              <h3 className="text-center text-gray-700 font-semibold">
                {singleProduct.make}
              </h3>
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
              title:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
              text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            }}
            placeholder="Type here..."
          />
        </div>
      </div>
    </Layout>
  );
}
