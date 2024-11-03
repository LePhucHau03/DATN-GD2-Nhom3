import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { callDeleteUser, callFetchListUser } from "../../../services/api.js";
import Search from './Search.jsx';
import UserDetail from "./UserDetail.jsx";
import UserCreate from "./UserCreate.jsx";
import UserUpdate from "./UserUpdate.jsx";

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [current, pageSize, filter, sortQuery]);

    const fetchUsers = async () => {
        setIsLoading(true);
        let query = `page=${current}&size=${pageSize}`;
        if (filter) query += `&${filter}`;
        if (sortQuery) query += `&${sortQuery}`;
        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text, record) => (
                <a href="#" onClick={() => {
                    setDataViewDetail(record);
                    setOpenViewDetail(true);
                }} className="text-indigo-500">{record.id}</a>
            )
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Enabled',
            dataIndex: 'enabled',
            sorter: true,
            render: (enabled) => (enabled ? 'Active' : 'Disabled'),
        },
        {
            title: 'Role',
            dataIndex: ['role', 'name'],
            sorter: true,
            render: (role) => (role === 'ROLE_ADMIN' ? 'Admin' : 'User'),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorter: true,
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            sorter: true,
        },
        {
            title: 'Action',
            render: (text, record) => (
                <div className="flex items-center gap-4">
                    <Popconfirm
                        title="Confirm delete"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Confirm"
                        cancelText="Cancel"
                    >
                        <a className="text-red-500 hover:text-red-600">Delete</a>
                    </Popconfirm>
                    <a
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataUpdate(record);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Edit
                    </a>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter) => {
        if (pagination.current !== current) setCurrent(pagination.current);
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field},asc` : `sort=${sorter.field},desc`;
            setSortQuery(q);
        }
    };

    const handleDeleteUser = async (userId) => {
        const res = await callDeleteUser(userId);
        if (res?.data?.statusCode === 204) {
            message.success('User deleted successfully');
            fetchUsers();
        } else {
            notification.error({
                message: 'Error occurred',
                description: res.message,
            });
        }
    };

    const renderHeader = () => (
        <div className="flex justify-between items-center bg-purple-600 text-white p-4 rounded-lg shadow-md">
            <span className="font-bold text-xl">User Table</span>
            <div className="flex gap-4">
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setOpenModalCreate(true)}
                    className="bg-pink-500 border-pink-500 rounded-lg"
                >
                    Add New
                </Button>
                <Button
                    type="ghost"
                    onClick={() => {
                        setFilter("");
                        setSortQuery("");
                    }}
                    className="border-none text-white"
                >
                    <ReloadOutlined />
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Search handleSearch={setFilter} />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="id"
                        pagination={{
                            current,
                            pageSize,
                            total,
                        }}
                    />
                </Col>
                <UserDetail
                    openViewDetail={openViewDetail}
                    setOpenViewDetail={setOpenViewDetail}
                    dataViewDetail={dataViewDetail}
                />
                <UserCreate
                    openModalCreate={openModalCreate}
                    setOpenModalCreate={setOpenModalCreate}
                    fetchUser={fetchUsers}
                />
                <UserUpdate
                    openModalUpdate={openModalUpdate}
                    setOpenModalUpdate={setOpenModalUpdate}
                    dataUpdate={dataUpdate}
                    fetchUser={fetchUsers}
                />
            </Row>
        </>
    );
};

export default UserTable;
