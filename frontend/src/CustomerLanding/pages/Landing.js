import React from "react";
import Layout from "../../Shared/Layout";
import Banner from "../../Shared/Banner";
import ProductCard from "../components/ProductCard";
import Loader from "../../Shared/Loader";

import { useGetCarsQuery } from "../../data/apiSlice";

export default function Landing() {
  const {
    data: cars,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCarsQuery();

  let content

  if (isLoading) {
    content = <div className="h-full w-full flex items-center justify-center">
      <Loader/>
    </div>
  } else if (isSuccess) {
    content = cars.map(car => <ProductCard key={car?.id} car={car} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCars());
  // }, [dispatch]);

  // const cars = useSelector((state) => state.cars);

  return (
    <Layout>
      <div className="px-4 py-2 h-max mx-10 bg-white gap-1 border border-gray-300 rounded-sm">
        <div id="banner" className="h-full rounded-sm py-2">
          <Banner />
        </div>
      </div>
      <h4 className="text-2xl font-medium px-8 mt-8">Products</h4>
      <div className="grid grid-cols-5 2xl:grid-cols-6 px-8 gap-2 2xl:gap-3 mt-4">
        {content}
        {/* {cars.loading && (
          <div className="flex items-center justify-center h-full col-span-5 2xl:col-span-6">
            <Loader />
          </div>
        )}
        {!cars.loading && cars?.error ? (
          <div className="flex items-center justify-center h-full w-full col-span-5 2xl:col-span-6">
            <Loader />
          </div>
        ) : null}
        {!cars.loading && cars?.cars?.length > 0 ? (
          <>
            {cars?.cars.map((car) => {
              return <ProductCard key={car.id} car={car} />
            })}
          </>
        ) : null} */}
      </div>


    </Layout>
  );
}
