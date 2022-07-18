import React from 'react'
import { useParams } from 'react-router-dom'

export default function SingleProductPage() {
    let {id } = useParams();
  return (
    <div>SingleProductPage:  {id}</div>
  )
}
