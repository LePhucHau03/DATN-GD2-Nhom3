import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "./ProductGrid.jsx";
import * as response from "autoprefixer";
import PayPalPayment from "../Payment/PayPalPayment.jsx";
import Contact from "../Contact.jsx";
import Slider from "../Slider/index.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";

const Home = () => {

    return (
        <div className="">
            <Slider/>
            <ProductGrid/>
            {/*<PayPalPayment/>*/}

            <div className="bg-purple-800 text-white py-6 px-4 mb-4 mt-2">
                <h2 className="text-3xl font-semibold mb-3">Nhận thêm thông tin cập nhật...</h2>
                <p className="mb-4">Bạn có muốn nhận thông báo khi có sản phẩm mới hoặc chương trình khuyến mãi không?
                    Đăng ký nhận bản tin của chúng tôi!</p>
                <div className="flex flex-col md:flex-row items-center">
                    <input type="email"
                           className="bg-purple-700 border border-purple-600 rounded-md py-2 px-3 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                           placeholder="Nhập địa chỉ email của bạn..."/>
                    <button
                        className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Đăng
                        ký
                    </button>
                </div>
                <p className="text-sm mt-3">Bằng cách đăng ký, bạn đồng ý với <a href="#"
                                                                                 className="text-fuchsia-300 hover:underline">Điều
                    khoản dịch vụ</a> và <a href="#" className="text-fuchsia-300 hover:underline">Chính sách bảo
                    mật</a> của chúng tôi.</p>
            </div>

        </div>
    );
};

export default Home;