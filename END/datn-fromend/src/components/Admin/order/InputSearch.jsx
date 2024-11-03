import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

const InputSearch = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let queryParts = [];

        if (values.receiverName) {
            queryParts.push(`receiverName~%27${values.receiverName}%27`);
        }
        if (values.receiverPhone) {
            queryParts.push(`receiverPhone~%27${values.receiverPhone}%27`);
        }
        if (values.receiverAddress) {
            queryParts.push(`receiverAddress~%27${values.receiverAddress}%27`);
        }
        if (values.email) {
            queryParts.push(`user.email~%27${values.email}%27`);
        }
        if (queryParts.length > 0) {
            const query = `filter=${queryParts.join('%20and%20')}`;
            console.log("Search query:", query);
            props.handleSearch(query);
        }
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            className="bg-purple-100 p-6 rounded-lg shadow-md mb-6"
            onFinish={onFinish}
        >
            <Row gutter={24} >
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="receiverName"
                        label={<span className="text-gray-800 font-semibold text-lg">Name</span>}
                    >
                        <Input
                            placeholder="Please input name!"
                            className="border-2 border-purple-300 bg-purple-50 rounded-lg p-1 transition duration-300 ease-in-out focus:border-purple-500"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="receiverPhone"
                        label={<span className="text-gray-800 font-semibold text-lg">Phone</span>}
                    >
                        <Input
                            placeholder="Please input phone!"
                            className="border-2 border-purple-300 bg-purple-50 rounded-lg p-1 transition duration-300 ease-in-out focus:border-purple-500"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="receiverAddress"
                        label={<span className="text-gray-800 font-semibold text-lg">Address</span>}
                    >
                        <Input
                            placeholder="Please input address!"
                            className="border-2 border-purple-300 bg-purple-50 rounded-lg p-1 transition duration-300 ease-in-out focus:border-purple-500"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24} className="text-right">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-pink-500 border-pink-500 text-white font-bold rounded-full px-6 py-2 hover:bg-pink-600 mr-2"
                    >
                        Search
                    </Button>
                    <Button
                        className="bg-gray-100 border border-gray-300 text-gray-700 font-bold rounded-full px-6 py-2 hover:bg-gray-200"
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("");
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default InputSearch;
