import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

const Search = ({ handleSearch, setFilter }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let queryParts = [];

        if (values.name) {
            queryParts.push(`name~%27${values.name}%27`);
        }

        if (queryParts.length > 0) {
            const query = `filter=${queryParts.join('%20and%20')}`;
            console.log("Search query:", query);
            handleSearch(query);
        }
    };

    return (
        <Form
            form={form}
            name="category_search"
            className="bg-purple-100 p-6 rounded-lg shadow-md mb-6"
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="name"
                        label={<span className="text-gray-800 font-semibold text-lg">Tên sản phẩm</span>}
                    >
                        <Input
                            placeholder="Nhập tên sản phẩm"
                            className="border-2 border-purple-300 bg-purple-50 rounded-lg p-1 transition duration-300 ease-in-out focus:border-purple-500"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="end">
                <Col>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-pink-500 border-pink-500 text-white font-bold rounded-full px-6 py-2 hover:bg-pink-600 mr-2"
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        className="bg-gray-100 border border-gray-300 text-gray-700 font-bold rounded-full px-6 py-2 hover:bg-gray-200"
                        onClick={() => {
                            form.resetFields();
                            setFilter("");
                            handleSearch("");
                        }}
                    >
                        Xóa
                    </Button>
                </Col>
            </Row>
            <style jsx>{`
                /* General styles */
                body {
                    font-family: 'Arial', sans-serif;
                }

                /* Input field styles */
                .ant-input {
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                }

                /* Primary button styles */
                .ant-btn-primary {
                    background-color: #f08080;
                    border-color: #f08080;
                    transition: all 0.3s ease;
                }

                .ant-btn-primary:hover {
                    background-color: #fa8072;
                    border-color: #fa8072;
                }
            `}</style>
        </Form>
    );
};

export default Search;
