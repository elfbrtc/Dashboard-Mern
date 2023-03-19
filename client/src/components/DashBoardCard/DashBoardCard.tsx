import React, { FC } from 'react'
import { Card, Space, Typography, Statistic } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { DashBoardCardProps } from './types'

const DashBoardCard:React.FC<DashBoardCardProps> = (props) => {
  return (
    <Card>
      <Space direction="horizontal">
          {props.icon}
          <Statistic title={props.title} value={props.value}/>
      </Space>
      </Card>
  )
}

export default DashBoardCard