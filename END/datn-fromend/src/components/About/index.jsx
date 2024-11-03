import React from 'react';

const About = () => {
    return (
        <>

            <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-center mb-4 text-brown-900">Giới thiệu về Trà Sữa XYZ</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Chào mừng bạn đến với Trà Sữa XYZ, nơi mang đến những ly trà sữa thơm ngon và sáng tạo nhất.
                    Chúng tôi tự hào sử dụng nguyên liệu tươi ngon và công thức đặc biệt để tạo ra những hương vị tuyệt vời.
                </p>
                <h3 className="text-2xl font-semibold text-brown-800 mb-2">Sứ mệnh của chúng tôi</h3>
                <p className="text-lg text-gray-700 mb-4">
                    Tại Trà Sữa XYZ, sứ mệnh của chúng tôi là mang đến cho khách hàng những trải nghiệm tuyệt vời
                    nhất với các sản phẩm trà sữa chất lượng, dịch vụ tận tâm và không gian thoải mái.
                </p>
                <h3 className="text-2xl font-semibold text-brown-800 mb-2">Sản phẩm của chúng tôi</h3>
                <p className="text-lg text-gray-700 mb-4">
                    Chúng tôi cung cấp một loạt các loại trà sữa và đồ uống sáng tạo, từ trà sữa truyền thống
                    đến những công thức mới lạ và độc đáo. Đừng quên thử món trà sữa trân châu đặc biệt của chúng tôi!
                </p>
                <div className="text-center">
                    <button className="bg-brown-900 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                        Khám Phá Ngay
                    </button>
                </div>
            </div>
        </>

    );
};

export default About;
