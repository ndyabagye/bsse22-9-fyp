import React from "react";
import Button from "../shared/Button";

function ProductCard() {
  return (
    <div className="w-full h-auto rounded-md bg-white shadow-md p-2 flex flex-col space-y-2">
      <div id="image" className="w-full h-32 object-cover bg-gray-300"></div>
      <div
        id="name"
        className="font-medium text-gray-700 border-b border-gray-200"
      >
        Product Name
      </div>
      <p id="price" className="font-normal text-gray-600">
        UGX 34,000
      </p>
      <p id="description" className="font-normal text-gray-600">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, dolorem?
      </p>
      <div id="buttons" className="grid grid-cols-2 gap-2">
        <Button className="rounded-md" variant="primary" size="normal">
          Action Button
        </Button>{" "}
        <Button className="rounded-md" variant="primary" size="normal">
          Action Button
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
