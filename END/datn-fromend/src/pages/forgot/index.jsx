import React from 'react';
import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { callRegister } from "../../services/api";

const ForgotForm = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = React.useState(false);

    const onFinish = async (values) => {
        const { name, firstName, email, password, confirmPassword } = values;
        setIsSubmit(true);

        const res = await callRegister({ name, firstName, email, password, confirmPassword });
        setIsSubmit(false);

        if (res?.data) {
            message.success('Registration successful!');
            navigate("/login");
        } else {
            notification.error({
                message: 'An error occurred!',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 1,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-pink-50">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center text-purple-600 mb-4">Forgot for Your Bubble Tea Account</h3>
                <Divider />
                <Form
                    name="register-form"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                    >
                        <Input className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    </Form.Item>

                    <Form.Item className="text-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmit}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-md w-full"
                        >
                            Send mail
                        </Button>
                    </Form.Item>
                </Form>
                <div className="flex justify-center mt-4">
                    <span>Already have an account?</span>
                    <a onClick={() => navigate('/login')} className="ml-2 text-purple-500 hover:text-purple-600 font-semibold cursor-pointer">
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotForm;
