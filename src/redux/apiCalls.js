import { loginFailure, loginStart, loginSuccess, logoutSuccess } from "./userRedux"
import { publicRequest } from "../functions/axiosInstance"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data.data));
    } catch (error) {
        console.log(error);
        dispatch(loginFailure());
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutSuccess());
}