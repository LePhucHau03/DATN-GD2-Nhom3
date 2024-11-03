import React, {useState} from 'react';
import {Button, Divider, Form, Input, message, Modal, notification} from 'antd';
import {callCreateUser} from '../../../services/api';

const UserCreate = (props) => {
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {name, email, password, firstName} = values;
        setIsSubmit(true);
        const res = await callCreateUser({name, email, password, firstName});
        if (res && res.data) {
            message.success('Created successfully');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser();
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
                title="Thêm mới người dùng"
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
                        label="First name"
                        name="firstName"
                        rules={[{required: true, message: 'Vui lòng nhập tên firstName!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Last name"
                        name="name"
                        rules={[{required: true, message: 'Vui lòng nhập tên hiển thị!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Vui lòng nhập email!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserCreate;



