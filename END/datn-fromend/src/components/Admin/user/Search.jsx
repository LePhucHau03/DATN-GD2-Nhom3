import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

const Search = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let queryParts = [];

        if (values.fullName) {
            queryParts.push(`name~%27${values.fullName}%27`);
        }

        if (values.email) {
            queryParts.push(`email~%27${values.email}%27`);
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
            className="bg-purple-100 p-6 rounded-lg shadow-lg transition duration-200 transform hover:shadow-xl" // Updated Tailwind classes
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label="Name"
                        name="fullName"
                        labelCol={{ span: 24 }}
                        className="text-pink-700 font-semibold" // Styling labels
                    >
                        <Input
                            placeholder="Enter full name"
                            className="rounded-lg border-pink-500 border-2 focus:border-pink-600 focus:ring-pink-500 transition duration-200" // Tailwind for input
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{ span: 24 }}
                        className="text-pink-700 font-semibold" // Styling labels
                    >
                        <Input
                            placeholder="Enter email"
                            className="rounded-lg border-pink-500 border-2 focus:border-pink-600 focus:ring-pink-500 transition duration-200" // Tailwind for input
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="text-right">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-purple-600 border-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition duration-200" // Tailwind for primary button
                    >
                        Search
                    </Button>
                    <Button
                        className="ml-2 border-gray-400 text-gray-600 rounded-lg px-4 py-2 hover:bg-gray-200 transition duration-200" // Tailwind for clear button
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("");
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
            <style jsx>{`
                /* Enhanced styling for bubble tea theme */
                .ant-form-item-label > label {
                    color: #8a2be2; /* Purple label color */
                }

                .ant-input {
                    border-radius: 8px;
                    border: 1px solid #d9d9d9;
                    transition: all 0.3s ease;
                }

                .ant-input:focus {
                    border-color: #ff6ec7; /* Focus color for bubble tea theme */
                }

                /* Search button */
                .ant-btn-primary {
                    background-color: #ff6ec7; /* Pinkish button color */
                    border-color: #ff6ec7;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                }

                .ant-btn-primary:hover {
                    background-color: #ff69b4; /* Brighter pink on hover */
                    border-color: #ff69b4;
                }

                /* Clear button */
                .ant-btn-default {
                    border-color: #ccc;
                    color: #555;
                }

                .ant-btn-default:hover {
                    background-color: #f0f0f0;
                    color: #333;
                }
            `}</style>
        </Form>
    );
};

export default Search;
