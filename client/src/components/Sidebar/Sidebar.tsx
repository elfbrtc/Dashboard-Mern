import React, { useState } from 'react';
import logo from '../../assets/logo.png'
import logo2 from '../assets/logo2.png'
import {
  LogoutOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  BankOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ContentPage from '../Content/Content';
import { useNavigate } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh',  background: 'white' }}>
      <Sider style={{background: 'white' }}  theme="light"  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        { collapsed ? 
        <div style={{ height: 32, margin: 16, display: 'flex' }}>
        <img style={{maxWidth: '100%', maxHeight:'100%', margin: 'auto', display: 'block'}}src={logo}></img>
        </div> :
            <div style={{height: 32, margin: 16 }}>
        <img style={{width: 'auto', height:'100%', padding:'5px'}}src={logo}></img>
        </div>
        }
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={[
          {
            key: '1',
            label: 'Dashboard',
            icon: <BarChartOutlined />,
            onClick: () => {navigate('/dashboard')}
          },
          {
            key: '2',
            label: 'Company',
            icon: <BankOutlined />,
            onClick: () => {navigate('/company')}
          },
          {
            key: '3',
            label: 'Product',
            icon: <ShoppingOutlined />,
            onClick: () => {navigate('/product')}
          },
          {
            key: '4',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: () => console.log('Logout')
          }
        ]} />
        
      </Sider>
    </Layout>
  );
};


export default Sidebar;