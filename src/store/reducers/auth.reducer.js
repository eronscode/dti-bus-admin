import * as actionTypes from '../actions/actionType';
 
const initialState = {
    initialising:false,
    error:null,
    loading:false,
    token:null,
    userData:{},
    setOTP: false,
    message: null,
    resetStatus: true,
    tokenVerify: false,
    isReset: false,
    resetSuccess: false

};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                error:null,
                message: null,
                loading:true
                
            };
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                error:null,
                loading:false,
                userData: action.user,
                token:action.token  
            };
        case actionTypes.AUTH_SET_OTP:
                return{
                    ...state,
                    loading:false,
                    setOTP:true,
                    userData: action.user 
                };
        case actionTypes.AUTH_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false, 
            }
        case actionTypes.AUTH_MESSAGE:
            return{
                ...state,
                message: action.message,
                loading: false, 
            }
        case actionTypes.AUTH_UNLOAD:
            return{
                ...state,
                message: null,
                error: null
            }
        
        case actionTypes.AUTH_REMOVE_OTP:
            return{
                ...state,
                setOTP: false
            }
        case actionTypes.AUTH_RESET_PASSWORD:
            return{
                ...state,
                resetStatus: false,
                tokenVerify: true
            }
        case actionTypes.AUTH_VERIFY_RESET_TOKEN:
            return{
                ...state,
                tokenVerify: false,
                isReset: true,
            }
        case actionTypes.AUTH_IS_RESET:
            return{
                ...state,
                isReset: false,
                resetSuccess: true
            }
        
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userData:null,
            }
        
        default:
            return state
    }


}
export default reducer;