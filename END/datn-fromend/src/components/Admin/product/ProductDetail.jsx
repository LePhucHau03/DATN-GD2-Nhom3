import { Avatar, Badge, Descriptions, Modal } from "antd";
import moment from 'moment';
import { AntDesignOutlined } from "@ant-design/icons";
import { useState } from 'react';

const UserViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${dataViewDetail?.imageUrl}`;

    return (
        <>
            {/* Modal hiển thị chi tiết người dùng */}
            <Modal
                title="Product detail"
                open={openViewDetail}
                onCancel={onClose}
                footer={null}
                width={"60vw"}
            >
                <Descriptions
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Image" span={2}>
                        <Avatar
                            size={100}
                            icon={<AntDesignOutlined />}
                            src={urlAvatar}
                            shape="square"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', margin: '0 auto', display: 'block', cursor: 'pointer' }}
                            onClick={handleAvatarClick}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Category">{dataViewDetail?.category?.name}</Descriptions.Item>
                    <Descriptions.Item label="Active" span={2}>
                        <Badge
                            status={dataViewDetail?.active ? "success" : "error"}
                            text={dataViewDetail?.active ? "Active" : "Inactive"}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">{dataViewDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Price">{dataViewDetail?.price}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="CreatedBy">
                        {dataViewDetail?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="UpdatedBy">
                        {dataViewDetail?.updatedBy}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            <Modal
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
            >
                <img
                    src={urlAvatar}
                    alt="Avatar"
                    style={{ width: '100%' }}
                />
            </Modal>
        </>
    );
}

export default UserViewDetail;
