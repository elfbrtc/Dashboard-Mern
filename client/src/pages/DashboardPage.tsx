import {Typography} from "antd"
import React, { useEffect } from 'react'
import Dashboard from "../components/Dashboard/Dashboard"
import Sidebar from '../components/Sidebar/Sidebar'
import {company} from '../services/endpoints/company'



const DashboardPage = () => {





  return (
    <div style={{width:'100%', height:'100%' }}>
      <Dashboard/>
    </div>
  )
}

export default DashboardPage