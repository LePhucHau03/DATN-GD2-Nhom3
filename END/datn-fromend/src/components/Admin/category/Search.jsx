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
            name="advanced_search"
            className="bg-purple-100 p-6 rounded-lg shadow-md"
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="name"
                        label={<span className="text-gray-700 text-base font-semibold">Category name</span>}
                    >
                        <Input
                            placeholder="Enter category name"
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
                        className="bg-pink-500 border-pink-500 text-white font-bold rounded-md hover:bg-pink-600 px-5 py-2 mr-2"
                    >
                        Search
                    </Button>
                    <Button
                        className="bg-pink-200 border-pink-300 text-pink-600 font-bold rounded-md hover:bg-pink-300 px-5 py-2"
                        onClick={() => {
                            form.resetFields();
                            setFilter("");
                            handleSearch("");
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Search;
