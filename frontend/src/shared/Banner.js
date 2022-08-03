import { Carousel } from "flowbite-react";
import React from "react";

export default function Banner() {
  return (
    <>
    <div className="h-96 flex flex-col">
  <Carousel>
    <img
    className="object-cover"
      src="/banner/mercedes.jpg"
      alt="..."
    />
    <img
    className="object-cover"
      src="/banner/bmw.jpg"
      alt="..."
    />
    <img
    className="object-cover"
      src="/banner/bond.jpg"
      alt="..."
    />
    <img
    className="object-cover"
      src="/banner/range.jpg"
      alt="..."
    />
    <img
    className="object-cover"
      src="/banner/drift.jpg"
      alt="..."
    />
    <img
    className="object-cover"
      src="/banner/m3.jpg"
      alt="..."
    />
  </Carousel>
  <div id="small-cards" className="grid grid-cols-4 gap-2 mt-4">
    <div className="bg-orange-300 rounded-md flex h-20"></div>
    <div className="bg-orange-300 rounded-md flex h-20"></div>
    <div className="bg-orange-300 rounded-md flex h-20"></div>
    <div className="bg-orange-300 rounded-md flex h-20"></div>
  </div>
</div></>
  );
}
