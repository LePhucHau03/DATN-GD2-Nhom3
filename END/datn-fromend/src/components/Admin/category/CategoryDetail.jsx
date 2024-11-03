import { Badge, Descriptions, Modal } from "antd";
import moment from 'moment';

const CategoryDetail = (props) => {
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
                    title="Thông tin doanh mục"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.name}</Descriptions.Item>

                    <Descriptions.Item label="Active" span={2}>
                        <Badge
                            status={dataViewDetail?.active ? "success" : "error"}
                            text={dataViewDetail?.active ? "Active" : "Inactive"}
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

export default CategoryDetail;
