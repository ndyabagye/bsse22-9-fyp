import React from "react";
// import Layout from '../../Shared/Layout'
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const singleProduct = useSelector((state) => state?.cars?.singleCar[0]);

  return (
    // <Layout>
    <>
      <main className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-1 flex-col overflow-y-scroll px-4 bg-gray-100 pt-2">
              <div className="flex items-start justify-center space-x-2">
                <div className="col-span-1 bg-white h-fit w-1/3 p-2 flex flex-col">
                  <h5 className="text-center text-3xl pb-3">Congratulations!!</h5>
                  <img
                    src={"data:image/jpeg;base64," + singleProduct?.image}
                    className="h-72 w-full object-cover rounded-md"
                    alt=""
                  />
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
                Price : UGX {singleProduct?.selling_price ? singleProduct?.selling_price: 'No price registered'}
              </h3>
              <p className="text-base border-b border-300 py-3">
                {singleProduct?.description ? singleProduct?.description : 'No description'}
                {/* {singleProduct?.description} */}
              </p>
                </div>
                <div className="col-span-1 bg-white h-fit w/2/3 p-2">
                  order summary
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <Footer />
        </div>
      </main>
    </>
    // </Layout>
  );
}
