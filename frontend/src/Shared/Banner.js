import { Carousel } from "flowbite-react";
import React from "react";
import mercedes from './assets/banner/mercedes.jpg';
import bmw from './assets/banner/bmw.jpg';
import bond from './assets/banner/bond.jpg';
import range from './assets/banner/range.jpg';
import drift from './assets/banner/drift.jpg';
import m3 from './assets/banner/m3.jpg';

export default function Banner() {
  return (
    <>
    <div className="h-96 flex flex-col">
  <Carousel>
    <img
    className="object-cover"
      src={mercedes}
      alt="..."
    />
    <img
    className="object-cover"
      src={bmw}
      alt="..."
    />
    <img
    className="object-cover"
      src={bond}
      alt="..."
    />
    <img
    className="object-cover"
      src={range}
      alt="..."
    />
    <img
    className="object-cover"
      src={drift}
      alt="..."
    />
    <img
    className="object-cover"
      src={m3}
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
