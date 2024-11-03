import { Badge, Descriptions, Divider, Space, Table, Tag, Modal, message } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { callOrderHistory, callHuyDonHang } from "../../services/api";
import { useSelector } from "react-redux";

const History = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const user = useSelector(state => state.account.user);

    useEffect(() => {
        fetchHistory();
    }, [user.id]);

    const fetchHistory = async () => {
        const res = await callOrderHistory(user.id);
        if (res && res.data) {
            setOrderHistory(res.data);
        }
    };

    const showModal = (record) => {
        setSelectedOrder(record);
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
    };

    const handleCancelOrder = (orderId, status) => {
        if (status !== 'Đã xác nhận') {
            message.warning(`Không thể hủy đơn hàng có trạng thái "${status}".`);
            return;
        }

        Modal.confirm({
            title: 'Xác nhận hủy đơn hàng',
            content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                try {
                    const response = await callHuyDonHang(orderId);
                    if (response.data.statusCode === 204) {
                        message.success('Hủy đơn hàng thành công!');
                        setOrderHistory(prevOrderHistory => prevOrderHistory.map(order =>
                            order.id === orderId ? { ...order, status: 'Hủy' } : order
                        ));
                    }
                } catch (error) {
                    message.error('Có lỗi xảy ra, không thể hủy đơn hàng.');
                }
            },
        });
    };

    const renderStatusTag = (status) => {
        let color;
        switch (status) {
            case 'Đã xác nhận':
                color = 'orange';
                break;
            case 'Đang vận chuyển':
                color = 'blue';
                break;
            case 'Thành công':
                color = 'green';
                break;
            case 'Hủy':
                color = 'red';
                break;
            default:
                color = 'default';
                break;
        }
        return <Tag color={color}>{status}</Tag>;
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (item) => moment(item).format('DD-MM-YYYY hh:mm:ss'),
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (item) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item),
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiverName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'receiverAddress',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => renderStatusTag(status),
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: (_, record) => (
                <div className='flex gap-4'>
                    <span onClick={() => showModal(record)} className='text-aqua cursor-pointer hover:underline'>Xem chi tiết</span>
                    <span onClick={() => handleCancelOrder(record.id, record.status)} className='text-red-500 cursor-pointer hover:underline'>Hủy</span>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <Table
                columns={columns}
                dataSource={orderHistory}
                pagination={false}
                rowKey="id"
                scroll={{ x: 800 }}
                rowClassName="border-b border-gray-300 hover:bg-gray-100"
                title={() => (
                    <div className="bg-blue-500 p-4 rounded-lg text-white text-lg font-semibold shadow">
                        Danh sách đơn hàng
                    </div>
                )}
                components={{
                    header: {
                        cell: ({ children }) => (
                            <th className="bg-blue-600 text-white p-3 text-left font-semibold">{children}</th>
                        ),
                    },
                }}
            />

            <Modal
                title="Chi tiết đơn hàng"
                visible={openModal}
                onCancel={closeModal}
                footer={null}
                width={'70%'}
                className="modal-custom"
            >
                {selectedOrder && (
                    <Descriptions bordered column={1}>
                        {selectedOrder.orderDetails.map((item, index) => (
                            <Descriptions.Item key={index} label={`STT ${index + 1} - ${item.productName}`} span={3}>
                                Số lượng: {item.quantity}, Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
}

export default History;
