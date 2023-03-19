import React, { FC, useEffect, useState } from 'react'
import { Styled } from './Dashboard.styled'
import { Card, Space, Typography, Statistic } from 'antd'
import {UserOutlined, BankOutlined, ShoppingOutlined} from '@ant-design/icons'
import DashBoardCard from '../DashBoardCard/DashBoardCard'
import DashboardTable from '../DashboardTable/DashboardTable'
import { company } from '../../services/endpoints/company'
import { product } from '../../services/endpoints/product'
import { auth } from '../../services/endpoints/auth'
import { CompanyResponsePayload} from '../../services/endpoints/company/types'
import { ProductResponseType} from '../../services/endpoints/product/types'
import { UserResponseType } from '../../services/endpoints/auth/types'
import DashBoardChart from '../DashboardChart/DashBoardChart'

const Dashboard:FC = () => {  

  const [companyState, setCompanyState] = useState<CompanyResponsePayload[]>([])
  const [productState, setProductState] = useState<ProductResponseType[]>([])
  const [userState, setUserState] = useState<UserResponseType[]>([])
  
  useEffect(() => {
    getCompanyData()
    getProductData()
    getAllUsers()
   
  }, [])

  const getCompanyData = () => {
    company.getAllCompany().then(({data}) => {
      console.log(data)
      setCompanyState(data)
    }).catch((err) => {
      console.log(err)
    })

  }

  const getProductData = () => {
    product.getAllProducts().then(({data}) => {
      console.log(data)
      setProductState(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const getAllUsers = () => {
    auth.getAllUsers().then(({data}) => {
      console.log(data)
      setUserState(data)
      
    }).catch((err) => {
      console.log(err)
    })
  }


  
  return (
    <Styled>
      <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">  
      <DashBoardCard icon={<UserOutlined style={{
        fontSize: '24px',
        color: '#f6abb6',
        backgroundColor: '#eee3e7',
        borderRadius: '50%',
        padding:8
      }} />} title={"Users"} value={userState.length}/>
      <DashBoardCard icon={<BankOutlined
      style={{color:'#4b86b4', fontSize:'24px', 
      backgroundColor:'#b3cde0', 
      borderRadius:'50%', 
      padding:8 }}

      />} title={"Company"} value={companyState.length}/>
      <DashBoardCard icon={<ShoppingOutlined
      style={{color:'#3d2352', fontSize:'24px', 
      backgroundColor:'#e4dcf1', 
      borderRadius:'50%', 
      padding:8 }}
      />} title={"Product"} value={productState.length}/>
      </Space>
      <Space  direction="vertical" style={{ }} >
        <DashboardTable data={companyState}/>
        <DashBoardChart data={productState}/>
      </Space>
      
      </Space>
        
    </Styled>
  )
}

export default Dashboard