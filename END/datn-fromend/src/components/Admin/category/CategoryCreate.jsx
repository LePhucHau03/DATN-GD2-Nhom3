import React, {useState} from 'react';
import {Button, Divider, Form, Input, message, Modal, notification} from 'antd';
import {callCreateCategory, callCreateUser} from '../../../services/api';

const CategoryCreate = (props) => {
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {name} = values;
        setIsSubmit(true);
        const res = await callCreateCategory({name});
        if (res && res.data) {
            message.success('Created successfully');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchCategories();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false);

    };

    return (
        <>

            <Modal
                title="Thêm mới doanh mục"
                open={openModalCreate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider/>

                <Form
                    form={form}
                    name="basic"
                    style={{maxWidth: 600}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Vui lòng nhập tên hiển thị!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CategoryCreate;
