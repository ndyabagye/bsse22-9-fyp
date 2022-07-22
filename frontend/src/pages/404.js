import React from 'react'

export default function NotFoundPage() {
  return (
    <div className='w-full h-full bg-gray-200 flex flex-col space-y-2'>
      <div className="col-md-12 text-center">
                <span className="display-1 d-block">404</span>
                <div className="mb-4 lead">
                  The page you are looking for was not found.
                </div>
                <a href="/" className="btn btn-link">
                  Back to Home
                </a>
              </div>
    </div>
  )
}
