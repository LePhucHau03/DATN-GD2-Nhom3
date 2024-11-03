import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification, Dropdown, Checkbox, Menu } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { callDeleteCategory, callFetchCategory } from "../../../services/api.js";
import Search from './Search.jsx';
import CategoryDetail from "./CategoryDetail.jsx";
import CategoryCreate from "./CategoryCreate.jsx";
import CategoryUpdate from "./CategoryUpdate.jsx";

const CategoryTable = () => {
    const [listCategory, setListCategory] = useState([]);
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

    const [selectedColumns, setSelectedColumns] = useState({
        id: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        action: true,
    });

    useEffect(() => {
        fetchCategories();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCategories = async () => {
        setIsLoading(true);
        let query = `page=${current}&size=${pageSize}`;
        if (filter) query += `&${filter}`;
        if (sortQuery) query += `&${sortQuery}`;
        const res = await callFetchCategory(query);
        if (res && res.data) {
            setListCategory(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const columnSelector = (
        <Menu>
            {Object.keys(selectedColumns).map((key) => (
                <Menu.Item key={key}>
                    <Checkbox
                        checked={selectedColumns[key]}
                        onChange={(e) => {
                            setSelectedColumns({
                                ...selectedColumns,
                                [key]: e.target.checked,
                            });
                        }}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Checkbox>
                </Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        selectedColumns.id && {
            title: 'ID',
            dataIndex: 'id',
            render: (text, record) => (
                <a href="#" onClick={() => { setDataViewDetail(record); setOpenViewDetail(true); }}>{record.id}</a>
            ),
        },
        selectedColumns.name && {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        selectedColumns.active && {
            title: 'Active',
            dataIndex: 'active',
            sorter: true,
            render: (active) => (active ? 'Active' : 'Inactive'),
        },
        selectedColumns.createdAt && {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorter: true,
        },
        selectedColumns.updatedAt && {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            sorter: true,
        },
        selectedColumns.action && {
            title: 'Action',
            render: (_, record) => (
                <div className="flex items-center gap-4">
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => handleDeleteCategory(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataUpdate(record);
                        }}
                    >
                        Edit
                    </Button>
                </div>
            ),
        },
    ].filter(Boolean);

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

    const handleDeleteCategory = async (categoryId) => {
        const res = await callDeleteCategory(categoryId);
        if (res?.data?.statusCode === 204) {
            message.success('Category deleted successfully');
            fetchCategories();
        } else {
            notification.error({
                message: 'Error',
                description: res.message,
            });
        }
    };

    const renderHeader = () => (
        <div className="flex justify-between items-center bg-purple-600 text-white p-4 rounded-lg shadow-md">
            <span className="font-bold text-xl">Category List</span>
            <div className="flex gap-4">
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setOpenModalCreate(true)}
                    className="bg-pink-500 border-pink-500 rounded-lg"
                >
                    Add Category
                </Button>
                <Button
                    icon={<ReloadOutlined />}
                    onClick={() => { setFilter(""); setSortQuery(""); fetchCategories(); }}
                    className="border-none "
                />
            </div>
        </div>
    );

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <Search handleSearch={setFilter} />
            </Col>
            <Col span={24}>
                <Table
                    title={renderHeader}
                    loading={isLoading}
                    columns={columns}
                    dataSource={listCategory}
                    onChange={onChange}
                    rowKey="id"
                    pagination={{ current, pageSize, total }}
                    style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
                />
            </Col>
            <CategoryDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
            <CategoryCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchCategories={fetchCategories}
            />
            <CategoryUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchCategories={fetchCategories}
            />
        </Row>
    );
};

export default CategoryTable;
