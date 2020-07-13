import * as actionTypes from './actionType';
import {SERVER_REQUEST} from '../../shared/Backend'
import {ApiEndpoints} from '../../config/Config'
import {SET_OTP_USER_DETAILS, SET_OTP, SAVE_TOKEN_USER_DETAILS} from '../../shared/Storage'


export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    }
}

export const authSetOTP = (user) => {
    return {
        type: actionTypes.AUTH_SET_OTP,
        user: user
    }
}

export const authRemoveOTP = () => {
    return {
        type: actionTypes.AUTH_REMOVE_OTP,
        
    }
}

export const authFailed = (error) => {
    return{
        type: actionTypes.AUTH_FAILED,
        error:error
    }
}

export const authMessage = (message) => {
    return{
        type: actionTypes.AUTH_MESSAGE,
        message,
    }
}


export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authInit = () => {
    return {
      type: actionTypes.AUTH_INIT,
    };
  };

export const authUnload = () =>{
    return {
        type: actionTypes.AUTH_UNLOAD
    }
}

export const authSendReset = () => {
    return{
        type: actionTypes.AUTH_RESET_PASSWORD,
    }
}

export const authTokenValidateSuccess = () => {
    return{
        type: actionTypes.AUTH_VERIFY_RESET_TOKEN,
    }
}

export const authResetSuccess = () => {
    return{
        type: actionTypes.AUTH_IS_RESET,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');


    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = timeout =>{
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, timeout * 1000);
    }
}


export const auth = (authData) => {
    return (dispatch) => {
        dispatch(authStart());
        SERVER_REQUEST(ApiEndpoints.USER_LOGIN, 'post', authData).then((data) => {
           
            if(data.error){
                const error = {
                    type: "login",
                    msg: data.message,
                  };
                dispatch(authMessage(error));
            }
            if(data.error == null || !data.error){
                if(data.jwt){
                    localStorage.removeItem('confirmOTP');
                    localStorage.removeItem('userDetailsOTP');
                    SAVE_TOKEN_USER_DETAILS(data.jwt, data.user);
                    dispatch(authSuccess(data.jwt, data.user));
                }
            }

            if(data.status === '99'){
                const error = {
                    type: "login",
                    msg: data.message,
                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
        }).catch((error) => {
           
            dispatch(authFailed(error));
        })
    };
};

export const signUp = (data) => {
    return dispatch =>{
        dispatch(authStart());
        const authData = data
        
        SERVER_REQUEST(ApiEndpoints.USER_REGISTER, 'post', authData).then((data) => {
            
            if(data.error){
                const error = {
                    type: "sign-up",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
            }
            if(data.error == null || !data.error){
                SET_OTP(true);
                SET_OTP_USER_DETAILS(data.response.phonenumber);
                dispatch(authSetOTP(data.response.phonenumber));
            }

            if(data.status === '99'){
                const error = {
                    type: "sign-up",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
            
            
            
        }).catch((error) => {
            
            dispatch(authFailed(error));
        })
    }
}

export const sendResetToken = (phoneNumber) => {
    return (dispatch) => {
        dispatch(authStart());
        SERVER_REQUEST(ApiEndpoints.USER_SEND_RESET_TOKEN, 'put', phoneNumber).then((data) => {
            
            if(data.error){
                const error = {
                    type: "reset",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
            }
            if(data.error === null){
                
                const success = {
                    type: "reset",
                    msg: data.response,
                    error: false
                  };
                dispatch(authMessage(success));
                dispatch(authSendReset());
                
            }

            if(data.status === '99'){
                const error = {
                    type: "reset",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
        }).catch((error) => {
           
            dispatch(authFailed(error));
        })
    };
};



export const validateResetToken = (formData) => {
    return (dispatch) => {
        dispatch(authStart());
        SERVER_REQUEST(ApiEndpoints.USER_PASSWORD_RESET, 'post', formData).then((data) => {
            
            if(data.error){
                const error = {
                    type: "reset",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
            }
            if(data.error === null){
                
                const success = {
                    type: "reset",
                    msg: data.response,
                    error: false
                  };
                dispatch(authMessage(success));
                dispatch(authTokenValidateSuccess());
                
            }

            if(data.status === '99'){
                const error = {
                    type: "reset",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
        }).catch((error) => {
           
            dispatch(authFailed(error));
        })
    };
};


export const resetPassword = (formData) => {
    return (dispatch) => {
        dispatch(authStart());
        SERVER_REQUEST(ApiEndpoints.USER_CHANGE_PASSWORD, 'put', formData).then((data) => {
            
            if(data.error){
                const error = {
                    type: "reset",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
            }
            if(data.error === null){
                
                const success = {
                    type: "reset",
                    msg: data.response,
                    error: false
                  };
                dispatch(authMessage(success));
                dispatch(authResetSuccess());
                
            }

            if(data.status === '99'){
                const error = {
                    type: "reset",
                    msg: data.message,
                    error: true
                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
        }).catch((error) => {
            
            dispatch(authFailed(error));
        })
    };
};



export const verifyOTP = (data) => {
    return dispatch => {
        dispatch(authStart());
        const phoneNumber = localStorage.getItem('userDetailsOTP');
        const Formdata = {
            token: data.otp,
            phonenumber: phoneNumber
        }
        
        SERVER_REQUEST(ApiEndpoints.VERIFY_USER, 'put', Formdata).then((data) => {
            
            if(data.error){
                const error = {
                    type: "verify",
                    msg: 'An Error Occured while validating your token',
                    error: true
                  };
                dispatch(authMessage(error));
        }
            if(data.error === null){

                const message = {
                    type: "verify",
                    msg: 'Verification Successful. Proceed to login!',
                    error: false
                };
                localStorage.removeItem('confirmOTP');
                localStorage.removeItem('userDetailsOTP');
                dispatch(authMessage(message));
                dispatch(authRemoveOTP());
                
            }

            if(data.status === '99'){
                const error = {
                    type: "verify",
                    msg: data.message,
                    error:true

                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
            
            
            
        }).catch((error) => {
            
            dispatch(authFailed(error));
        })
    }
}

export const resendOTP = () => {
    return dispatch => {
        dispatch(authStart());
        const phoneNumber = localStorage.getItem('userDetailsOTP');
        const Formdata = {
            phonenumber: phoneNumber
        }
        
        SERVER_REQUEST(ApiEndpoints.USER_RESEND_OTP, 'post', Formdata).then((data) => {
            
            if(data.error){
                const error = {
                    type: "verify",
                    msg: 'An Error Occured while validating your token',
                    error: true
                  };
                dispatch(authMessage(error));
            }
            if(data.error == null || !data.error){

                const message = {
                    type: "verify",
                    msg: 'Verification Token has been resent to your device.',
                    error: false
                };
                dispatch(authMessage(message));;
                
            }

            if(data.status === '99'){
                const error = {
                    type: "verify",
                    msg: data.message,
                  };
                dispatch(authMessage(error));
                dispatch(authFailed(data.message));
            }
            
            
            
        }).catch((error) => {
            
            dispatch(authFailed(error));
        })
    }
}


export const onUnload = () => {
    return dispatch => {
        dispatch(authUnload())
    }
}



export const checkAuthState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        const OTP = localStorage.getItem('confirmOTP');
        const phoneNumber = localStorage.getItem('userDetailsOTP');
        const userDetails = JSON.parse(localStorage.getItem('userData'));
        dispatch(authInit());
        
        if(OTP === 'true'){
            dispatch(authSetOTP(phoneNumber))
        }else{
            if(!token){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token, userDetails));
            }
            
        }
        //else{
        //     const expirationDate =  new Date(localStorage.getItem('expirationDate'));

        //     if(expirationDate > new Date()){
        //         const userId = localStorage.getItem('userId');
        //         dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
        //         dispatch(authSuccess(token, userId));
        //     }else{
        //         dispatch(logout())
        //     }
        // }
    }
}
