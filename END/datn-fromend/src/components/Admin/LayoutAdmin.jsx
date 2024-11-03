import React, { useState } from 'react';
import {
    DashboardOutlined,
    UserOutlined,
    FolderOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, Link } from 'react-router-dom';

const { Content, Header } = Layout;

const items = [
    {
        label: <Link to='/admin'>Thống kê</Link>,
        key: 'dashboard',
        icon: <DashboardOutlined />
    },
    {
        label: <Link to='/admin/user'>Quản lý User</Link>,
        icon: <UserOutlined />,
        key: 'user'
    },
    {
        label: <Link to='/admin/category'>Quản lý d.mục</Link>,
        icon: <FolderOutlined />,
        key: 'category',
    },
    {
        label: <Link to='/admin/product'>Quản lý s.phẩm</Link>,
        icon: <ShoppingCartOutlined />,
        key: 'product'
    },
    {
        label: <Link to='/admin/order'>Quản lý đ.hàng</Link>,
        icon: <ShoppingOutlined />,
        key: 'order',
    },
];

const LayoutAdmin = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate();

    return (
        <Layout className="min-h-screen bg-gray-900">
            <Header className="bg-gray-800 flex justify-between items-center px-4 py-2">
                <div className="text-xl font-semibold text-gray-100">
                    Trang quản trị
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[activeMenu]}
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                    className="border-b-0 flex-grow justify-center"
                />

                <div
                    className="text-orange-500 cursor-pointer font-medium hover:text-orange-400"
                    onClick={() => navigate('/')}
                >
                    Home Page
                </div>
            </Header>

            <Layout>
                <Content className="p-5">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
