import { Table, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { CompanyResponsePayload } from '../../services/endpoints/company/types'
import { DashboardTableProps } from './types'

const DashboardTable:FC<DashboardTableProps> = (props) => {
    const [data, setData] =useState<CompanyResponsePayload[]>([])
    const [loading, setLoading] = React.useState(false)



    useEffect(() => {
        setLoading(true)
        if(props.data.length > 5){
            setData(props.data.splice(0, 5))
        }
        else{
            setData(props.data)
        }
        setLoading(false)
        console.log(props.data)

    }, [props.data])


  return (
  <>
  <Typography.Text>Last Added 5 Company Information</Typography.Text>
  <Table columns={[{
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
    },
    {
        title: 'Legal Number',
        dataIndex: 'companyLegalNumber',
        key: 'companyLegalNumber',
    },
    {
        title: 'Country',
        dataIndex: 'companyCountry',
        key: 'companyCountry',
    },
    {
        title: 'Website',
        dataIndex: 'companyWebsite',
        key: 'companyWebsite'
    },
    ]}
    loading={loading}
    dataSource={data}
    rowKey="_id"
    >
    

    </Table>  
  </>
    
  )
}

export default DashboardTable