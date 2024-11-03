import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {message} from "antd";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        "email": "",
        "name": "",
        "firstName": "",
        "role": {
            "id": "",
            "name": ""
        },
        "id": ""
    }
};
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.data;
        },
        doLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.isLoading = true;
            state.user = {
                "email": "",
                "name": "",
                "firstName": "",
                "role": {
                    "id": "",
                    "name": ""
                },
                "id": ""
            }
            message.success("Logout successfully");
        },
        doUpdateUserInfoAction: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload // Cập nhật thông tin user từ payload
            };
        }
    },
    extraReducers: (builder) => {

    },
});

export const {doUpdateUserInfoAction, doLoginAction, doGetAccountAction, doLogoutAction} = accountSlice.actions;

export default accountSlice.reducer;
