import axios from 'axios';
import {actionType} from "../const";


const signUp = (userInfo) => {
    return async (dispatch) => {
        try {
            // Send signup request to backend
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/user/create`, userInfo);

            if (res.status === 200) {
                // console.log('Signup successful:', res.data);
                return true;  // Return true if signup is successful}
            }

        } catch (error) {
            // console.error('Error signing up:', error.message);
            throw error;  // Throw the error to handle it in the component
        }
    };
};

const logIn = (userInfo) => {
    return async (dispatch) => {
        try {
            // Send login request to backend
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/login`, userInfo);

            // Extract token from the response
            const { token } = res.data;
            // console.log('Login successful, token:', token);

            // Save the token to localStorage or sessionStorage
            localStorage.setItem('token', token);  // Store JWT token in localStorage or sessionStorage

            // Dispatch the user data to the store
            dispatch({
                type: actionType.LOGIN,
                token: token,    
            });

            dispatch(getUserInfo(userInfo.email));  // Fetch user info after login

            // console.log('User is logged in successfully and user info fetched');
        } catch (error) {
            throw error;  // Throw the error to handle it in the component
            
        }
    };
};

const getUserInfo = (userEmail) => {
    return async (dispatch) => {
        try {

            const token = localStorage.getItem('token');  // Retrieve the token from localStorage

            // Send request to fetch user info based on the email, including token in headers
            const userRes = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/user/${userEmail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token in the Authorization header
                }
            });

            const user = userRes.data; // Extract user data
            // console.log('Fetched user info:', user);

            // Dispatch the user data to the store
            dispatch({
                type: actionType.GET_USER_INFO,
                user: user,
            });

            localStorage.setItem('user', JSON.stringify(user.firstName));

        } catch (error) {
            if(error.response.data.message === "Invalid token"){
                localStorage.removeItem('token');
                localStorage.removeItem('email');

            }
        }
    };
}


export default {
    logIn,
    getUserInfo,
    signUp,
   
}