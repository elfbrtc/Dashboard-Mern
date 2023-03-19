import React, { useEffect, useState } from 'react'
import { Styled } from './Company.styled'
import { Typography } from 'antd'
import CompanyTable from '../CompanyTable/CompanyTable'
import { CompanyResponsePayload } from '../../services/endpoints/company/types'
import { company } from '../../services/endpoints/company'

const Company: React.FC= () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [companyState, setCompanyState] = useState<CompanyResponsePayload[]>([])

  useEffect(() => {
    setLoading(true)
    getCompanyData()
  }
    , [])

    const getCompanyData = () => {
      company.getAllCompany().then(({data}) => {
        console.log(data)
        setCompanyState(data)
      }).catch((err) => {
        console.log(err)
      })
  
    }

  return (
    <Styled>
        <CompanyTable data={companyState}/>
    </Styled>
  )
}

export default Company