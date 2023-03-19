import React, { FC, useEffect, useState } from 'react'
import { Styled } from './Product.styled'
import { Typography } from 'antd'
import { ProductResponseType } from '../../services/endpoints/product/types'
import { product } from '../../services/endpoints/product'
import ProductTable from '../ProductTable/ProductTable'
const Product: FC = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [productState, setProductState] = useState<ProductResponseType[]>([])

  useEffect(() => {
    setLoading(true)
    getProductData()
  }
    , [])

    const getProductData = () => {
      product.getAllProducts().then(({data}) => {
        console.log(data)
        setProductState(data)
      }).catch((err) => {
        console.log(err)
      })
  
    }

  return (
    <Styled>
        <ProductTable data={productState}/>
    </Styled>
  )
}

export default Product