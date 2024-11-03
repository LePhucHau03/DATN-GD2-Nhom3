import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Modal, Form, Input, Select, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { callCapNhatDonHang, callGetAllOrder } from '../../../services/api.js'; // Update with correct API service
import * as XLSX from 'xlsx';
import moment from 'moment';
import InputSearch from './InputSearch.jsx';
import OrderViewDetail from './OrderViewDetail.jsx';

const OrderTable = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    const [listOrder, setListOrder] = useState([]);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [form] = Form.useForm();

    const statusOptions = ['Đã xác nhận', 'Vận chuyển', 'Hoàn thành', 'Đã hủy'];

    useEffect(() => {
        fetchOrders();
    }, [current, pageSize, filter, sortQuery]);

    const fetchOrders = async () => {
        setIsLoading(true);
        let query = `page=${current}&size=${pageSize}`;
        if (filter) query += `&${filter}`;
        if (sortQuery) query += `&${sortQuery}`;
        const res = await callGetAllOrder(query);
        if (res && res.data) {
            setListOrder(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: true,
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Name',
            dataIndex: 'receiverName',
            sorter: true,
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Phone',
            dataIndex: 'receiverPhone',
            sorter: true,
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Address',
            dataIndex: 'receiverAddress',
            sorter: true,
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            sorter: true,
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorter: true,
            render: (createdAt) => moment(createdAt).format('DD-MM-YYYY hh:mm:ss'),
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            className: "text-gray-700 font-semibold",
        },
        {
            title: 'Action',
            render: (text, record) => (
                <div className="flex gap-4">
                    <Button
                        type="link"
                        className="text-blue-500 font-medium"
                        onClick={() => { setDataViewDetail(record); setOpenViewDetail(true); }}
                    >
                        View
                    </Button>
                    <Button
                        type="primary"
                        className="bg-blue-500 text-white"
                        onClick={() => { setOpenModalUpdate(true); setDataUpdate(record); form.setFieldsValue(record); }}
                    >
                        Update
                    </Button>
                </div>
            ),
            className: "text-gray-700 font-semibold",
        },
    ];

    const onChange = (pagination, filters, sorter) => {
        if (pagination.current !== current) setCurrent(pagination.current);
        if (pagination.pageSize !== pageSize) setPageSize(pagination.pageSize);
        if (sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field},asc` : `sort=${sorter.field},desc`;
            setSortQuery(q);
        }
    };

    const handleExportData = () => {
        if (listOrder.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listOrder);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportOrder.csv");
        }
    };

    const handleUpdateOrder = async () => {
        try {
            const values = await form.validateFields();
            const res = await callCapNhatDonHang(values);
            if (res.statusCode === 200) {
                message.success('Order updated successfully');
                setOpenModalUpdate(false);
                await fetchOrders();
            } else {
                message.error('Failed to update order');
            }
        } catch (error) {
            console.error("Failed to update order", error);
        }
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleSearch={(query) => { setFilter(query); setCurrent(1); }} />
                </Col>
                <Col span={24}>
                    <Table
                        title={() => (
                            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                                <span className="text-lg font-semibold text-gray-700">Order Table</span>
                                <div>
                                    <Button
                                        icon={<ExportOutlined />}
                                        type="primary"
                                        className="bg-pink-500 border-pink-500 text-white rounded-full px-4 hover:bg-pink-600"
                                        onClick={handleExportData}
                                    >
                                        Export
                                    </Button>
                                    <Button type="ghost" onClick={() => {
                                        setFilter("");
                                        setSortQuery("");
                                    }}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        )}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listOrder}
                        onChange={onChange}
                        rowKey="id"
                        pagination={{ current, pageSize, total }}
                        className="bg-white rounded-lg shadow"
                    />
                </Col>
            </Row>

            <Modal
                title="Update Order"
                open={openModalUpdate}
                onCancel={() => setOpenModalUpdate(false)}
                onOk={handleUpdateOrder}
                okText="Update"
                className="rounded-lg"
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Order ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select a status' }]}
                    >
                        <Select>
                            {statusOptions.map((status) => (
                                <Select.Option key={status} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="receiverAddress"
                        rules={[{ required: true, message: 'Please enter the address' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <OrderViewDetail openViewDetail={openViewDetail} setOpenViewDetail={setOpenViewDetail} dataViewDetail={dataViewDetail} />
        </>
    );
};

export default OrderTable;
