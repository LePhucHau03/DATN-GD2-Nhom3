import axios from '../utils/axios-customize.js'
//doanh mục
export const callFetchCategory = (query) =>{
    return axios.get(`/api/v1/category?${query}`);
}
export const callFetchAllCategory = () =>{
    return axios.get(`/api/v1/category/all`);
}
export const callDeleteCategory = (categoryId) =>{
    return axios.delete(`/api/v1/category/${categoryId}`);
}
export const callCreateCategory = ({name}) => {
    return axios.post('/api/v1/category', {name});
}
export const callUpdateCategory = ({id, name, active}) => {
    return axios.put(`/api/v1/category`, {id, name, active});
}
export const callFetchProduct = (query) =>{
    return axios.get(`/api/v1/product?${query}`);
}

export const callCreateProduct = ({name, price, thumbnail, description, brandId}) => {
    return axios.post('/api/v1/product', {name, price, imageUrl: thumbnail, description, categoryId: brandId});
}
export const callUpdateProduct = ({ id, name, price, imageUrl, description, categoryId, active }) => {
    return axios.put('/api/v1/product', { id, name, price, imageUrl, description, categoryId, active });
};
export const callDeleteProduct = (productId) =>{
    return axios.delete(`/api/v1/product/${productId}`);
}
export const callFetchProductById = (id) => {
    return axios.get(`api/v1/product/${id}`)
}
export const callAddToCart = (cartData) => {
    return axios.post('/api/v1/cart', cartData); // Pass the cartData object directly
};

export const callFetchDataCart = (userID) => {
    return axios.get(`/api/v1/cart/${userID}`);
}
export const callDeleteOneProductInCart = async (id) => {
    return axios.delete(`/api/v1/cart/delete-one/${id}`);
}
export const callChangeQuantityCartItem = (cartId, quantity) => {
    return axios.post(`/api/v1/cart/change-cart-quantity`, {cartId, quantity});
}
export const callDeleteCart = (id) => {
    return axios.delete(`/api/v1/cart/${id}`);
}


export const callFindRevenueStatisticsByMonthAndYear = () => {
    return axios.get('/api/v1/statistics/find-revenue-statistics-by-month-and-year');
}
export const callCategoryProductCount = () => {
    return axios.get('/api/v1/statistics/category-product-count');
}
export const callCountUserOrder = () => {
    return axios.get('/api/v1/statistics/count-user-order');
}
export const callHuyDonHang = (id) => {
    return axios.delete(`/api/v1/order/${id}`);
}
export const callCapNhatDonHang = (data) => {
    return axios.put(`/api/v1/order`, data);
}





















































































































































































































































































































































//////user
export const callRegister = ({name, firstName, email, password, confirmPassword}) => {
    return axios.post('/api/v1/auth/register', {name, firstName, email, password, confirmPassword});
}
export const callLogin = ({ username, password}) => {
    return axios.post('/api/v1/auth/login', {username, password});
}
export const callFetchAccount = () =>{
    return axios.get("/api/v1/auth/account");
}
export const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
}
export const callFetchListUser = (query) =>{
    return axios.get(`/api/v1/user?${query}`);
}
export const callDeleteUser = (userId) =>{
    return axios.delete(`/api/v1/user/${userId}`);
}
export const callCreateUser = ({name, email, password, firstName}) => {
    return axios.post('/api/v1/user', {name, email, password, firstName});
}
export const callUpdateUser = ({id, name, firstName, enabled}) => {
    return axios.put(`/api/v1/user`, {id, name, firstName, enabled});
}
export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
}
export const callUpdateProfile = ({id, firstName, name}) => {
    return axios.post(`/api/v1/user/update-information`, {id, firstName, name});
}
export const callChangePassword = ({id, currentPassword, newPassword, confirmPassword}) => {
    return axios.post(`/api/v1/user/change-password`, {id, currentPassword, newPassword, confirmPassword});
}

















export const callPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}

export const callOrderHistory = (id) => {
    return axios.get(`/api/v1/order/${id}`);
}
export const callGetAllOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`);
}





























































































































































































































































export const callUploadFile = (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return axios.post('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};