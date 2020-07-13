import React, {Component} from 'react';
import classes from './Dashboard.module.css';
import { FindIcon, DownloadMobileIcon , UpdateProfileIcon} from '../../../config/Config';
import { NavLink } from 'react-router-dom';
import { SideBar } from '../../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import TripList from '../../../components/Account/Trips/TripList/index'
import * as actions from '../../../store/actions';

class Dashboard extends Component {



    componentDidMount(){
        this.props.getUserTrips()
    }


    render(){

        const tripDetails = this.props.tripData.slice(0,3).reverse();
        
        let trip  = null;
        if(this.props.tripLoading){
            trip=(
                <TripList/>
            )
        }
        
        if(this.props.tripData && this.props.tripData.length !== 0){
            trip = (
                <>
                {tripDetails.length !== 0 ? 
                tripDetails.map((element,i) => (
                    <TripList 
                    key={i}
                    {...element} />
                )):
                <div style={{margin: '11px 0',
                        background: '#fff',
                        padding: '30px 0px',
                        boxShadow: '0px 10px 20px #00000010'}}>
            <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '17px'}}>No recent trips found.</h4>
            
            </div>}
                
                </>
            )
        }

        

    
        return(
            <React.Fragment>
            {/* <div className={classes.Banner}>
                <h1>Find and book trips</h1>
                
                    <BookingForm/>
            </div> */}
            <section className={classes.section}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ">
                            <div className={classes.welcomeText}>
                                <h4>Hi {this.props.userData.fullname}, it's nice to see you.</h4>
                            </div>
                            <div className={classes.navigateHelper}>
                                <div className={classes.itemNavigateHelper}>
                                    <img width="100" src={FindIcon} alt="find bookings"/>
                                    <h4>Find the best deals on trips</h4>
                                    <NavLink to="/find-trips">Let's Go</NavLink>
                                </div>
                                
                                <div className={classes.itemNavigateHelper}>
                                    <img width="100" src={UpdateProfileIcon} alt="find bookings"/>
                                    <h4>Manage your trips & bookings</h4>
                                    <NavLink to="/my-trips">Let's Go</NavLink>
                                </div>
                                <div className={classes.itemNavigateHelper}>
                                    <img width="100" src={DownloadMobileIcon} alt="find bookings"/>
                                    <h4>Download the mobile app</h4>
                                    <NavLink to="/find-trips">IOS</NavLink>
                                    <NavLink to="/find-trips">Andriod</NavLink>
                                </div>
                            </div>
                            <div className={classes.Bookings}>
                                <div className={classes.header}>
                                    <h1>Recent Trips</h1>
                                    <NavLink to="/my-trips">View All</NavLink>
                                </div>
                                
                                {trip}
                                
                            </div>

                            {/* <div className={classes.Bookings}>
                                <div className={classes.header}>
                                    <h1>Recent Trips</h1>
                                    <a href="sdme">View All</a>
                                </div>
                                <BookingList />
                                <BookingList />
                                <BookingList />
                                <BookingList />
                                <BookingList />
                            </div> */}
                        </div>
                        <div className="col-md-4 offset-md">
                            <SideBar
                            history={this.props.history}/>
                        </div>
                    </div>
                    
                </div>
            </section>
           
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.auth.loading,
        userData: state.auth.userData,
        tripData: state.trip.userTripData,
        tripLoading: state.trip.initiateUserTrip,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTrips: () => dispatch(actions.getUserTrip())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);