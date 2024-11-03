import React, {useEffect, useState} from 'react';
import {Divider, Form, Input, message, Modal, notification, Radio, Upload, Button, InputNumber, Select} from 'antd';
import {
    callCreateCategory,
    callCreateProduct,
    callFetchAllCategory,
    callFetchCategory,
    callUploadFile
} from '../../../services/api';
import { UploadOutlined } from '@ant-design/icons';

const ProductCreate = (props) => {
    // eslint-disable-next-line react/prop-types
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState(null); // Lưu URL của ảnh upload

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        const res = await callFetchAllCategory();
        if (res && res.data) {
            const d = res.data
                .filter(item => item.active)
                .map(item => ({ label: item.name, value: item.id }));
            setListCategory(d);
            console.log(listCategory);
        }
    };

    // Hàm upload file (thumbnail)
    const handleUploadThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadFile(file, 'category-thumbnail'); // Gọi API upload
        if (res && res.data) {
            const newThumbnail = res.data.fileName;
            setThumbnailUrl(newThumbnail); // Lưu lại URL của ảnh sau khi upload
            onSuccess('ok');
        } else {
            onError('Upload ảnh thất bại');
        }
    };

    const propsUploadThumbnail = {
        maxCount: 1,
        multiple: false,
        customRequest: handleUploadThumbnail,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success('Upload ảnh thành công');
            } else if (info.file.status === 'error') {
                message.error('Upload ảnh thất bại');
            }
        },
    };

    const onFinish = async (values) => {
        const {name, price, description, brandId} = values;
        setIsSubmit(true);
        const res = await callCreateProduct({
            name,
            price,
            thumbnail: thumbnailUrl, // Pass the thumbnail URL from state
            description,
            brandId // Pass the brandId (category)
        });
        if (res && res.data) {
            message.success('Created successfully');
            form.resetFields();
            setOpenModalCreate(false);
            // eslint-disable-next-line react/prop-types
            await props.fetchCategory();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            });
        }
        setIsSubmit(false);
    };


    return (
        <>
            <Modal
                title="Thêm mới"
                open={openModalCreate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                centered
            >
                <Divider/>

                <Form
                    form={form} //quy dinh Form la form khi submit cai model se submit form luon
                    name="basic"
                    style={{maxWidth: 600}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item  label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Vui lòng nhập price!' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item  label="Description" name="description" rules={[{ required: true, message: 'Vui lòng nhập description!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Loại hàng" name="brandId" rules={[{ required: true, message: 'Vui lòng chọn doanh mục!' }]}>
                        <Select showSearch allowClear options={listCategory} />
                    </Form.Item>

                    {/* Upload ảnh Thumbnail */}
                    {/*rules={[{ required: true, message: 'Thumbnail không được để trống!' }]}*/}
                    <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}>
                        <Upload {...propsUploadThumbnail}>
                            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                        </Upload>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default ProductCreate;
