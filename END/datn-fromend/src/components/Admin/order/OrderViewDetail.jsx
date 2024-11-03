import { Descriptions, Modal, Grid } from "antd";
import moment from 'moment';

const { useBreakpoint } = Grid;

const CategoryViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    // Ant Design's responsive grid system
    const screens = useBreakpoint();

    // Function to close the Modal and clear the data
    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    };

    return (
        <Modal
            title="Order Detail"
            open={openViewDetail}
            onCancel={onClose}
            footer={null}
            width={screens.xs ? "100%" : screens.sm ? "80%" : screens.md ? "60%" : "40%"} // Responsive width
            bodyStyle={{ paddingBottom: 20 }}
        >
            <Descriptions
                bordered
                column={screens.xs ? 1 : screens.sm ? 2 : 3} // Responsive columns
            >
                <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{dataViewDetail?.receiverName}</Descriptions.Item>
                <Descriptions.Item label="Address" span={3}>
                    {dataViewDetail?.receiverAddress}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">{dataViewDetail?.receiverPhone}</Descriptions.Item>
                <Descriptions.Item label="Total Price">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.totalPrice)}
                </Descriptions.Item>
                <Descriptions.Item label="User ID">{dataViewDetail?.user?.id}</Descriptions.Item>
                <Descriptions.Item label="User Email">{dataViewDetail?.user?.email}</Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Created By">{dataViewDetail?.createdBy}</Descriptions.Item>
                <Descriptions.Item span={3}>
                    <h3>Order Details</h3>
                </Descriptions.Item>
                {
                    dataViewDetail?.orderDetails?.map((item, index) => (
                        <Descriptions.Item key={index} label={`Item ${index + 1} - ${item.productName}`} span={3}>
                            Quantity: {item.quantity}, Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </Descriptions.Item>
                    ))
                }
            </Descriptions>
        </Modal>
    );
};

export default CategoryViewDetail;
