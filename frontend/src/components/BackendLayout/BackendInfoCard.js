import React from "react";
import { Link}  from "react-router-dom";

export default function BackendInfoCard({ title, percentage, icon, metric }) {
  return (
    <div className="bg-gray-50 shadow-lg py-6 px-4 flex flex-col items-center justify-center w-64 h-max rounded-md">
      <div className="w-full flex items-center justify-between">
       <span className="text-gray-700 text-lg">
         {title}
        </span>
       <span>
         {percentage}%
        </span>
      </div>
      <div className="h-16 w-full flex items-center justify-between">
        <div className="rounded-full bg-blue-300">{icon}</div>
        {metric}
      </div>
      <div className="w-full flex items-center justiify-start">
      <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">View More</Link>
      </div>
    </div>
  );
}
