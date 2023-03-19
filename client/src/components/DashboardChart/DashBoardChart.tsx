import React, { FC, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DashboardChartProps } from './type';
import { ProductResponseType } from '../../services/endpoints/product/types';
import { Card } from 'antd';
import { Styled } from './DashboardChart.styled';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const DashBoardChart:FC<DashboardChartProps> = (props) => {

    const [productData, setProductData] = useState(
        {
            labels: [],
            datasets: []
        }
    )
    
    useEffect(() => {
        const labels = props.data.map((item) => item.productName)
        const data = props.data.map((item) => item.productAmount)
        console.log(labels)
        console.log(data)
        const dataSource:any = {
            labels,
            datasets: [
              {
                label: 'Product Count',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }
            ],
          };
          setProductData(dataSource)
    }, [props.data])

        

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Chart',
      },
    },
  };
  
  return (
    <Styled>
      <Card style={{width:800, height:500}}>
        <Bar options={options} data={productData} />
      </Card>
    </Styled>
    
    
  )
}

export default DashBoardChart