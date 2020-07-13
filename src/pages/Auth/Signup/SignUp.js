import React, { Component } from 'react';
import classes from './SignUp.module.css';
import {SignUpBg} from '../../../config/Config';
import {checkValidity} from '../../../shared/Method'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";
import { OverlaySpinner } from '../../../components/UI/Spinner/OverlaySpinner';
import {NavLink} from 'react-router-dom'


const bgLeft = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${SignUpBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}

class SignUp extends Component{

    state = {
        formOne: {
            fullname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g john smith'
                },
                label: 'Full Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            phonenumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g 08067278197'
                },
                label: 'Phone Number',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e.g myemail@gmail.com'
                },
                label: 'Email Address',
                value: '',
                validation: {
                    required: true,
                    email:true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: ''
                },
                label: 'Password',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
            },
        },
        formTwo:{
            kinname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g john smith'
                },
                label: 'Next of Kin Full Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            kinphonenumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g +2348067278197'
                },
                label: 'Phone Number',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            kinemail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e.g myemail@gmail.com'
                },
                label: 'Email Address',
                value: '',
                validation: {
                    required: true,
                    email:true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            kinaddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                label: 'Address',
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
        errorMsg: {},
        toggleForm: false
    }

    componentDidMount(){
        console.log('SIGNUP PAGE');
        if (this.props.setOTP && !this.props.loading) {
            this.props.history.push("/verify-otp");
            
          } 
  
          if (this.props.isAuth && !this.props.loading) {
              this.props.history.push("/dashboard");
              
          }
    }

    componentDidUpdate(prevProps) {
        if (this.props.setOTP && !this.props.loading) {
          this.props.history.push("/verify-otp");
          
        } 

        if (this.props.isAuth && !this.props.loading) {
            this.props.history.push("/dashboard");
            
        }
      }

      componentWillUnmount(){
        
        this.props.onUnload();

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
        
    }

    nextHandler = (event) => {
        event.preventDefault();
        if(!this.state.formOneIsValid){
            alert('hhe')
            return
        }

        this.setState({toggleForm: true})
        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
          

        // const formData = {};
        // for( let key in this.state.loginForm){
        //     formData[key]=this.state.loginForm[key].value;
        // }

        // alert(formData)
        
    }
    prevHandler = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.setState({toggleForm: false})
    }

    signUpHandler = (event) => {
        event.preventDefault();
        if(!this.state.formTwoIsValid){
            alert('hhe')
            return
        }

        const formData = {};
        for( let key in this.state.formOne){
            formData[key]=this.state.formOne[key].value;
        }

        const formTwoData = {};
        for( let key in this.state.formTwo){
            formTwoData[key]=this.state.formTwo[key].value;
        }

        const formValue = {
            ...formData,
            ...formTwoData
        }
        console.log(formValue);
        this.props.onAuth(formValue);
    }

    

    render(){
        let message = '';
        if(this.props.message && this.props.message.type === "sign-up"){
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
            message = <p style={{color:'red'}}>{this.props.message.msg}</p>
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
                <form onSubmit={this.nextHandler}>
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
            
            <Button btnType="btnFull" clicked={this.loginHandler} disabled={!this.state.formOneIsValid}>Next</Button>
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
                <form style={{transition: 'transform 0.3s ease-out'}} onSubmit={this.signUpHandler}>
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
                    {message ? <div className="app-error">{message}</div> : ''}
                    <div className={classes.nextPrev}>
                    <Button btnType="btnPrev" clicked={this.prevHandler} disabled={!this.state.formOneIsValid || this.props.loading}>Previous</Button>
                    <Button btnType="btnFull" clicked={this.signUpHandler} disabled={!this.state.formTwoIsValid || this.props.loading}>Sign Me Up!</Button>
                    </div>
            
            </form>
            </React.Fragment>
            );

        return(
        <React.Fragment>
            <div className={classes.SignUp}>
                <div style={bgLeft} className={classes.leftItem}>

                </div>
                <div  className={classes.rightItem}>
                    <div className={classes.formArea}>
                        <div className={classes.formHeader}> 
                            <h3>Create your account</h3>
                            
                            {/* <p>{!this.state.toggleForm ? 'it\'s totally Free' : 'Almost Done! One more step'}</p> */}
                        </div>
                        <div className={classes.container}>
                                <ul className={classes.progressbar}>
                                    <li className={!this.state.toggleForm ? classes.active : classes.active }>Personal Information</li>
                                    <li  className={this.state.toggleForm ? classes.active : null}>Next Of Kin Information</li>
                                    
                                </ul>
                            </div>
                        
                        <div style={{width:'100%',position:'relative'}}>
                        {!this.state.toggleForm ? formOne : formTwo}
                        
                        <OverlaySpinner loading={this.props.loading} />
                        </div>

                        <div style={{margin:'30px 0', textAlign:'center'}}>
                            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
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
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
      onAuth: (formData) => dispatch(actions.signUp(formData)),
      onUnload: () => dispatch(actions.onUnload())
  
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);