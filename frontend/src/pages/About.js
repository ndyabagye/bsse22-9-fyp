import React from 'react'

export default function About() {

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  {/* <img src="/grid.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" /> */}
  <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div className="mx-auto max-w-md">
      <img src="/logo192.png" className="h-6" alt="Tailwind Play" />
      <div className="divide-y divide-gray-300/50">
        <div className="space-y-6 py-8 text-xl font-medium leading-7 text-gray-600">
          <p>About Us (BSSE2209 FYP)</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Ndyabagye Henry
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Kigula Jesse James
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Ssembatya Isaac</p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Kirabo Kakopo Atuhurira</p>
            </li>
          </ul>
        </div>
        <div className="pt-8 text-base font-semibold leading-7">
          <p className="text-gray-900">Our blog</p>
          <p>
            <a href="https://sites.google.com/view/bse22-9/home" className="text-sky-500 hover:text-sky-600">Read the blog &rarr;</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
