import React from 'react'
// import Layout from '../../Shared/Layout'
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
import { useSelector } from 'react-redux'

export default function CheckoutPage() {

  const singleProduct = useSelector((state) => state?.cars?.selectedCar);

  return (
    // <Layout>
    <>
    <main className="flex flex-col h-screen">
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col">
        <Header/>
        <div className="flex flex-1 flex-col overflow-y-scroll px-4 bg-gray-100 pt-2">

        <div className="flex items-start justify-center space-x-2">
            <div className="col-span-1 bg-white h-fit w-1/3 p-2 flex flex-col">
                <img src={singleProduct?.img_url} alt="" />
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quidem reiciendis neque quis modi aperiam eligendi accusamus minus doloremque blanditiis, veritatis odit. Aspernatur eos ex doloribus! Repellendus ipsa eligendi tempora.
                </p>
            </div>
            <div className="col-span-1 bg-white h-fit w/2/3 p-2">
              order summary
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex"><Footer/></div>
  </main>
      </>
    // </Layout>
  )
}
