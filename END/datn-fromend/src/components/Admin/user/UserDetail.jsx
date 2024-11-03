import { Badge, Descriptions, Modal } from "antd";
import moment from 'moment';

const UserDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    return (
        <>
            <Modal
                title="Detail"
                visible={openViewDetail}
                onCancel={onClose}
                footer={null}
                width={"50vw"}
            >
                <Descriptions
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Họ">{dataViewDetail?.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Tên">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>

                    <Descriptions.Item label="Role" span={2}>
                        <Badge
                            status="processing"
                            text={dataViewDetail?.role?.name === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
}

export default UserDetail;
