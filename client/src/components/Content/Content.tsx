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

const items: MenuItem[] = [
  getItem('Dashboard', '1', <BarChartOutlined />),
  getItem('Company', '2', <BankOutlined />),
  getItem('Product', '3', <ShoppingOutlined />),
  getItem('Logout', '4', <LogoutOutlined />)
];

const ContentPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
    <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      Bill is a cat.
    </div>
  </Content></div>
  )
}

export default ContentPage