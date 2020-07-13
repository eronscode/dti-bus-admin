import React from 'react';
import classes from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {

    return(
        <div className={classes.Footer}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <p>© 2020 DTI, Inc. All rights reserved</p>
                    </div>
                    <div className="col-md-4">
                       <ul>
                           <li><NavLink to="/">Privacy policy</NavLink></li>
                           <li><NavLink to="/">Terms & Conditions</NavLink></li>
                           <li><NavLink to="/">About us</NavLink></li>
                       </ul>
                    </div>
                    <div className="col-md-4">
                       <ul>
                           <li><a><i className="fas fa-facebook"></i></a></li>
                       </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Footer;