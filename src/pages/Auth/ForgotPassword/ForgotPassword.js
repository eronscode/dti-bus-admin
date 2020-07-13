import React, { Component } from 'react';
import classes from './ForgotPassword.module.css';
import {LoginBg, VerifyIcon} from '../../../config/Config';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {checkValidity} from '../../../shared/Method'
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";
import {OverlaySpinner} from '../../../components/UI/Spinner/OverlaySpinner'
import {NavLink} from 'react-router-dom';


const bgLeft = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${LoginBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}

class ForgotPassword extends Component{

    state = {
        formOne: {
            phonenumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
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

        formTwo: {
            passwordupdatetoken: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Token'
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

        formThree: {
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter new password'
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
        formOneIsValid: false,
        formTwoIsValid: false,
        formThreeIsValid: false,
        errorMsg: {},
        toggleForm: false,
        phoneNumber: ''
    }

    componentDidMount(){
        this.componentCheckAuth();
    }


    componentDidUpdate(prevProps) {
        this.componentCheckAuth();
    }

    componentWillUnmount(){
        
        this.props.onUnload();

    }

      componentCheckAuth = () =>{
        if (this.props.setOTP && !this.props.loading) {
            this.props.history.push("/verify-otp");
            
        }
  
        if (this.props.isAuth && !this.props.loading) {
            this.props.history.push("/dashboard");
              
        }
      }

    inputChangedHandler = (event, inputIdentifier, type)=> {

        let updatedLoginForm = {}
        if(type === 1){
            updatedLoginForm = {
                ...this.state.formOne
            };
        }
        if(type === 2){
            updatedLoginForm = {
                ...this.state.formTwo
            };
        }

        if(type === 3){
            updatedLoginForm = {
                ...this.state.formThree
            };
        }
        
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

        if(type === 1){
            this.setState({formOne: updatedLoginForm, formOneIsValid: formIsValid});
        }
        if(type === 2){
            this.setState({formTwo: updatedLoginForm, formTwoIsValid: formIsValid});
        }

        if(type === 3){
            this.setState({formThree: updatedLoginForm, formThreeIsValid: formIsValid});
        }
        
    }

    sendResetTokenHandler = (event) => {
        event.preventDefault();
        if(!this.state.formOneIsValid){
            alert('All fields are important')
            return
        }

        const formData = {};
        for( let key in this.state.formOne){
            formData[key]=this.state.formOne[key].value;
        }
        this.setState({
            phoneNumber: this.state.formOne.phonenumber.value
        })
        this.props.sendResetToken(formData);
        
    }

    validateResetTokenHandler = (event) => {
        event.preventDefault();
        if(!this.state.formTwoIsValid){
            alert('All fields are important')
            return
        }

        const formData = {};
        for( let key in this.state.formTwo){
            formData[key]=this.state.formTwo[key].value;
        }
        
        formData.phonenumber= this.state.phoneNumber;

     
        this.props.validateResetToken(formData);
    }

    resetPasswordHandler = (event) => {
        event.preventDefault();
        if(!this.state.formThreeIsValid){
            alert('All fields are important')
            return
        }

        const formData = {};
        for( let key in this.state.formThree){
            formData[key]=this.state.formThree[key].value;
        }
        
        formData.phonenumber= this.state.phoneNumber;

       
        this.props.resetPassword(formData);
    }


    render(){
        let message = '';
        if(this.props.message && this.props.message.type === "reset"){
            message = <div className="app-error"><p style={{color:'red',margin:'0'}}>{this.props.message.msg}</p></div>
        }

        if(this.props.message && this.props.message.type === "reset" && !this.props.message.error){
            message = <div className="app-success"><p style={{color:'green',margin:'0'}}>{this.props.message.msg}</p></div>
            
        }

        let formElementsArray = [];
        for(let key in this.state.formOne){
            formElementsArray.push({
                id: key,
                config: this.state.formOne[key]
            })
        }

        let formOne = (
            <React.Fragment>
                <div className={classes.formHeader}> 
                            <h3>Forgot Password?</h3>
                            <p>Enter your phone number. An OTP code will be sent to you shortly</p>
                </div>
                {message ? message : ''}
                <form onSubmit={this.sendResetTokenHandler}>
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
                        changed={(event) => this.inputChangedHandler(event, element.id, 1)}/>
                       
                        </React.Fragment>
                    ))}
            
            <Button btnType="btnFull" clicked={this.sendResetTokenHandler} disabled={!this.state.formOneIsValid}>Send Token</Button>
            </form>
            </React.Fragment>
            );


        let formElementsArrayTwo = [];
        for(let key in this.state.formTwo){
            formElementsArrayTwo.push({
                id: key,
                config: this.state.formTwo[key]
            })
        }

        let formTwo = (
            <React.Fragment>
                <div className={classes.formHeader}> 
                            <h3>Validate Token</h3>
                            <p>Please Enter the OTP sent to your phone.</p>
                </div>
                <form style={{transition: 'transform 0.3s ease-out'}} onSubmit={this.validateResetTokenHandler}>
                    {formElementsArrayTwo.map(element => (
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
                        changed={(event) => this.inputChangedHandler(event, element.id, 2)}/>
                       
                        </React.Fragment>
                    ))}
                    {message ? message: ''}
            <Button btnType="btnFull" clicked={this.validateResetTokenHandler} disabled={!this.state.formTwoIsValid || this.props.loading}>Validate Token</Button>
            </form>
            </React.Fragment>
            );

            let formElementsArrayThree = [];
            for(let key in this.state.formThree){
                formElementsArrayThree.push({
                    id: key,
                    config: this.state.formThree[key]
                })
            }
    
            let formThree = (
                <React.Fragment>
                     <div className={classes.formHeader}> 
                            <h3>Enter your new password</h3>
                            <p>Please Enter your preferred password !</p>
                    </div>
                    <form style={{transition: 'transform 0.3s ease-out'}} onSubmit={this.resetPasswordHandler}>
                        {formElementsArrayThree.map(element => (
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
                            changed={(event) => this.inputChangedHandler(event, element.id, 3)}/>
                           
                            </React.Fragment>
                        ))}
                        {message ? message: ''}
                <Button btnType="btnFull" clicked={this.resetPasswordHandler} disabled={!this.state.formThreeIsValid || this.props.loading}>Reset Password!</Button>
                </form>
                </React.Fragment>
                );
        return(
        <React.Fragment>
            <div className={classes.Login}>
                <div style={bgLeft} className={classes.leftItem}>

                </div>
                <div  className={classes.rightItem}>
                    <div className={classes.formArea}>
                        
                        
                        <div style={{width:'100%',position:'relative'}}>
                        {this.props.resetStatus ? formOne : ''}
                        {this.props.tokenVerify ? formTwo : ''}
                        {this.props.isReset ? formThree : ''}
                        {this.props.resetSuccess 
                        ? 
                     
                           <div style={{textAlign:'center'}}>
                        <img src={VerifyIcon} width="100" alt="" />
                        <p style={{margin:'30px 0', fontSize:'18px'}}>Password Changed Successfully. Proceed to <NavLink to="/login">login</NavLink> </p>
                        </div> 
                        : 
                        
                        ''}
                        <OverlaySpinner loading={this.props.loading} />
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      error: state.auth.error,
      loading: state.auth.loading,
      setOTP: state.auth.setOTP,
      message: state.auth.message,
      isAuth: state.auth.token !== null,
      resetStatus: state.auth.resetStatus,
      tokenVerify : state.auth.tokenVerify,
      isReset: state.auth.isReset,
      resetSuccess: state.auth.resetSuccess,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
      onAuth: (formData) => dispatch(actions.auth(formData)),
      onUnload: () => dispatch(actions.onUnload()),
      sendResetToken : (phonenumber) => dispatch(actions.sendResetToken(phonenumber)),
      validateResetToken : (formData) => dispatch(actions.validateResetToken(formData)),
      resetPassword : (formData) => dispatch(actions.resetPassword(formData))
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);