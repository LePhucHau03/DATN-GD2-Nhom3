import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu ở đây (gọi API hoặc gửi email)
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold text-center mb-4 text-brown-900">Liên hệ với chúng tôi</h2>
            <p className="text-lg text-gray-700 mb-4 text-center">
                Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Hãy để lại thông tin liên lạc và
                chúng tôi sẽ phản hồi sớm nhất có thể.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Tên của bạn
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Địa chỉ email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                        Tin nhắn của bạn
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-brown-900 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Gửi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
