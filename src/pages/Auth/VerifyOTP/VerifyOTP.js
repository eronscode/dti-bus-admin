import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from "../../../store/actions";
import classes from './verifyOTP.module.css';
import {OTPIcon, VerifyIcon} from '../../../config/Config'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {checkValidity} from '../../../shared/Method'
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import {NavLink} from 'react-router-dom'

class VerifyOTP extends Component{

    state = {
        otpForm: {
            otp: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter OTP'
                },
                label: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
        },
        otpFormIsValid: false,
        errorMsg: {},
    }

    componentDidUpdate(prevProps) {

        // if (this.props.isAuth && !this.props.loading) {
        //     this.props.history.push("/dashboard");
            
        // }
        // if (!this.props.isVerify && !this.props.loading) {
        //     this.props.history.push("/dashboard");
            
        // }
      }

      componentDidMount(){
          //this.props.onVerify('1234');
          if (this.props.isAuth && !this.props.loading) {
            this.props.history.push("/dashboard");
            
        }
        if (!this.props.isVerify && !this.props.loading) {
            this.props.history.push("/dashboard");
            
        }
      }

      inputChangedHandler = (event, inputIdentifier)=> {
        const updatedLoginForm = {
            ...this.state.otpForm
        };
        const updatedFormElement = { 
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        let check = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        updatedFormElement.errorMsg = check[0]; 
        updatedFormElement.valid = check[1]; 
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({otpForm: updatedLoginForm, otpFormIsValid: formIsValid});
    }


    verifyHandler = (event) => {
        event.preventDefault();
        if(!this.state.otpFormIsValid){
            alert('Please all fields are mandatory')
            return
        }

        const formData = {};
        for( let key in this.state.otpForm){
            formData[key]=this.state.otpForm[key].value;
        }

        this.props.onVerify(formData);
    }

      
      
        
      
         
      
       
   

    render(){

        let verifyStatus = this.props.isVerify;
        console.log('VERIFY STATUS-->' + verifyStatus);
        let message = '';
        if(this.props.message && this.props.message.type === "verify" && this.props.message.error){
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
            message = <div className="app-error"><p style={{color:'red'}}>{this.props.message.msg}</p></div>

        }

        if(this.props.message && this.props.message.type === "verify" && !this.props.message.error){
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
            message = <p style={{color:'green'}}>{this.props.message.msg}</p>

        }

        let formElementsArray = [];
        for(let key in this.state.otpForm){
            formElementsArray.push({
                id: key,
                config: this.state.otpForm[key]
            })
        }

        let formOne = (
            <React.Fragment>
                {message ? message: ''}
                <form onSubmit={this.verifyHandler}>
                    {formElementsArray.map(element => (
                        <React.Fragment key={element.id}>
                        <Input 
                        label={element.config.label}
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig}  
                        value={element.config.value} 
                        invalid={!element.config.valid}
                        errorMsg={element.config.errorMsg}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
                       
                        </React.Fragment>
                    ))}
            
            <Button btnType="verify" clicked={this.verifyHandler} disabled={!this.state.otpFormIsValid}>Verify</Button>
           
            </form>
            <div className={classes.resendOtp}>
                <p>Didn't get the code? <button onClick={this.props.resendOTP}>Resend OTP</button></p>
            </div>
            </React.Fragment>
            );




        return(
            <section className={classes.section}>
                <div className="container"> 
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6 offset-md-3">
                                
                                <div style={{width:'100%',position:'relative'}}>
                                        <div className={classes.Otp}>
                                        
                                            <h1>OTP Verification</h1>
                                            {!verifyStatus ? 
                                                <React.Fragment>
                                                <img src={VerifyIcon} alt="verify success" />
                                                {message ? message: ''}
                                                <NavLink to="/login">Login</NavLink>
                                                </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <img src={OTPIcon} alt="" />
                                                <p>Hi, we've sent an OTP Code to your phone. Please enter the code sent to your phone.</p>
                                            
                                                {formOne}
                                            </React.Fragment>
                                            }

                                        </div>
                                        <div style={{
                                            display : this.props.loading ? 'flex' : 'none'
                                        }} className={classes.overlay}>
                                            <Spinner/>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
      error: state.auth.error,
      loading: state.auth.loading,
      isVerify: state.auth.setOTP,
      message: state.auth.message,
      isAuth: state.auth.token !== null,

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
      onVerify: (otp) => dispatch(actions.verifyOTP(otp)),
      resendOTP : () => dispatch(actions.resendOTP())
  
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
