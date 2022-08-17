import React from 'react'
import { BsThreeDots} from 'react-icons/bs';

export default function BackendGraph({title, subTitle}) {
  return (
    <div className='bg-slate-300 flex flex-col p-2 rounded-md h-full'>
        <div className="flex justify-between w-full">
            <div className="flex flex-col">
                <span className="text-lg text-purple-700">{title}</span>
                <span className="text-sm text-purple-700">{subTitle}</span>
            </div>
            <div className="cursor-pointer">
                <BsThreeDots className='text-purple-800'/>
            </div>
        </div>
        {/* graph */}
        <div className="h-72 w-full flex items-center justify-center"> graph</div>
    </div>
  )
}
