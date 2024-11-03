import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { callFetchProductById, callAddToCart } from "../../services/api.js";
import { useSelector } from "react-redux";
import { message } from "antd";

const ProductDetail = () => {
    const [data, setData] = useState();
    const [quantity, setQuantity] = useState(1);
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // product id
    const user = useSelector((state) => state.account.user);

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        const res = await callFetchProductById(id);
        if (res && res.data) {
            setData(res.data);
        }
    };

    const handleAddToCart = async () => {
        const cartData = {
            userID: user.id,
            productID: data.id,
            quantity: quantity,
        };

        const response = await callAddToCart(cartData);
        if (response && response.data) {
            message.success("Product added to cart successfully!");
        } else {
            message.error("Failed to add product to cart.");
        }
    };

    return (
        <>
            {data && (
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image */}
                        <div className="md:w-1/3">
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${data.imageUrl}`}
                                    alt={data.name}
                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                />
                            </div>
                        </div>

                        {/* Product details */}
                        <div className="md:w-2/3">
                            <h1 className="text-3xl font-bold text-purple-900 mb-4">{data.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <svg
                                            key={index}
                                            className="w-5 h-5 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 22 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 ml-2">(5)</span>
                            </div>
                            <p className="text-gray-600 mb-2">Category: {data.category.name}</p>
                            <p className="text-2xl font-bold text-red-500 mb-4">
                                {data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </p>
                            <p className="mt-4 text-gray-700">{data.description}</p>

                            {/* Quantity Input */}
                            <div className="mt-4">
                                <label className="block text-gray-700 mb-2" htmlFor="quantity">
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="border border-gray-300 rounded-md py-2 px-3 w-20"
                                    min="1"
                                />
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-6 transition duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subscription Section */}
            <div className="bg-purple-800 text-white p-6 mb-4 mt-2 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-3">Nhận thêm thông tin cập nhật...</h2>
                <p className="mb-4">Bạn có muốn nhận thông báo khi có sản phẩm mới hoặc chương trình khuyến mãi không? Đăng ký nhận bản tin của chúng tôi!</p>
                <div className="flex flex-col md:flex-row items-center">
                    <input
                        type="email"
                        className="bg-purple-700 border border-purple-600 rounded-md py-2 px-3 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                        placeholder="Nhập địa chỉ email của bạn..."
                    />
                    <button
                        className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                    >
                        Đăng ký
                    </button>
                </div>
                <p className="text-sm mt-3">Bằng cách đăng ký, bạn đồng ý với <a href="#" className="text-fuchsia-300 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-fuchsia-300 hover:underline">Chính sách bảo mật</a> của chúng tôi.</p>
            </div>
        </>
    );
};

export default ProductDetail;
