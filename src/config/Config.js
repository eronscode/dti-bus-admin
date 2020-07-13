import bannerimage from '../assets/images/bgimg2.jpeg';
import loginBg from '../assets/images/bgimg5.jpeg';
import signUpBg from '../assets/images/bgimg6.jpeg';
import busIcon from '../assets/images/busicon.svg';
import payIcon from '../assets/images/mastercard.svg';
import profileIcon from '../assets/images/user-img.png';
import findIcon from '../assets/images/location.png';
import updateProfileIcon from '../assets/images/refresh.png';
import downloadMobileIcon from '../assets/images/smartphone.png';
import otpicon from '../assets/images/otp3.jpg';
import verify from '../assets/images/verified.png';
import error from '../assets/images/erroricon.png';
import searchvector from '../assets/images/searchvector.jpg';
import nothingfound from '../assets/images/nothingfound.png';


export const BannerImage = bannerimage;
export const LoginBg = loginBg
export const SignUpBg = signUpBg;
export const BusIcon = busIcon;
export const currency = "₦";
export const ProfileIcon = profileIcon;
export const FindIcon = findIcon;
export const UpdateProfileIcon = updateProfileIcon;
export const DownloadMobileIcon = downloadMobileIcon;
export const PayIcon = payIcon;
export const OTPIcon = otpicon;
export const VerifyIcon = verify;
export const ErrorIcon = error;
export const Searchvector = searchvector;
export const NothingFound = nothingfound;


export const BASE_URL = 'http://128.199.143.171:9005/';


export const ApiEndpoints = {
    
    USER_LOGIN: 'authenticate',
    USER_REGISTER: 'registeruser',
    VERIFY_USER: 'verifyUserOTP',
    USER_SEND_RESET_TOKEN: 'sendTokenToUpdatePassword',
    USER_PASSWORD_RESET: 'verifyTokenForUpdatePassword',
    USER_CHANGE_PASSWORD: 'changepassword',
    USER_RESEND_OTP: 'resendOtpForUserAuthentication',
    FIND_TRIP: 'findtrips',
    GET_TRIP_DETAILS: 'getTripDetailsUsingId',
    BOOK_TRIP: tripId => `booktrips/${tripId}`,
    FETCH_USER_TRIP : 'getBookedTripsByPhonenumber',
    FETCH_USER_PROFILE: 'getUserProfile',
    UPDATE_PROFILE:'updateprofile',
    
    GET_PRODUCT_DETAILS: productId => `product/${productId}/getproductbyid/review`,
    
};

export const states = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'kano', label: 'Kano' },
    { value: 'benin', label: 'Benin' },
  ];