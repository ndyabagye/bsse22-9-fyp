import React from 'react'
import BackendLayout from '../components/BackendLayout/BackendLayout';
import BackendInfoCard from '../components/BackendLayout/BackendInfoCard';
import BackendGraph from '../components/BackendLayout/BackendGraph';
import { BsCartCheck, BsCreditCard2Back, BsPersonCircle } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';

export default function Dashboard() {
  return (
    <BackendLayout title={'DashBoard'}>
        {/* information cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            <BackendInfoCard title="Orders" percentage='12' icon={BsCartCheck} metric="32" />
            <BackendInfoCard title="Products" percentage='32' icon={AiFillCar} metric="32" />
            <BackendInfoCard title="Users" percentage='12' icon={BsPersonCircle} metric="32" />
            <BackendInfoCard title="Total Sales" percentage='12' icon={BsCreditCard2Back} metric="32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 mt-3">
            <div className="flex flex-col col-span-1 space-y-2">
            <BackendGraph title="Monthly Sales" subTitle="Monthly Traffic and Sales" />
            <BackendGraph title="Monthly Sales" subTitle="Monthly Traffic and Sales" />
            </div>
            <div className="col-span-1">
            <BackendGraph title="Monthly Sales" subTitle="Monthly Traffic and Sales" />
            </div>
        </div>
    </BackendLayout>
  )
}
