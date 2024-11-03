import React, { useState } from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callLogin } from "../../services/api";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;
        setLoading(true);
        try {
            const res = await callLogin({ username, password });
            setLoading(false);

            if (res?.data?.user) {
                localStorage.setItem('access_token', res.data.access_token);
                dispatch(doLoginAction(res.data.user));
                message.success('Login successful!');
                console.log(res?.data?.user?.role?.id);
                if(res?.data?.user?.role?.id === 1){
                    navigate("/admin");
                }else{
                    navigate("/");
                }

            } else {
                throw new Error(res?.data?.message || 'Login failed');
            }
        } catch (error) {
            setLoading(false);
            notification.error({
                message: 'Error',
                description: error.message || 'Something went wrong!',
                duration: 2,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-pink-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Login to Your Tea Account</h2>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="username"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    </Form.Item>

                    <Form.Item className="text-center">
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-md w-full"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <Link to="/forgot" className="hover:text-purple-500">Forgot password?</Link>
                    <div className="flex items-center">
                        <span>Don’t have an account?</span>
                        <Link to="/register" className="ml-1 text-purple-500 hover:text-purple-600 font-semibold">Register now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
