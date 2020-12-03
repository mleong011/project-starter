import React, { Component } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { Redirect } from 'react-router-dom';
import auth from '../services/auth';

const CLIENT_ID =
  "158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com";

export class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      failed: false, 
      email: "",
      name: "",
      userId:"",
  
      isLogined: false,
      accessToken: "",
      image:"",
    };
    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }


  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      accessToken: "",
    }));
    
  }



  login = (response) => {
    //response.preventDefault();
    let { email, name, accessToken } = this.state;
    auth.authenticate(email, name, accessToken)
      .then((user) => {
        this.setState({ redirectToReferrer: true });
      })
      .catch((err) => {
        this.setState({ failed: true });
      });
      
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }


  render() {

    const responseGoogle = (response) => {
      if (response.accessToken) {
        this.setState((state) => ({
          isLogined: true,
          accessToken: response.accessToken,
          name: response.profileObj.name,
          email: response.profileObj.email,
          image: response.profileObj.imageUrl,
          userId: response.profileObj.googleId,
        }));
      }
      console.log("response is", response);
      var res = response.profileObj;
      console.log("res is:", res);
     this.login(response);
    }
    // if(this.state.isLogined) return <Redirect to="/" />;

    return(
      <div className="App">
        <div className="row">
          <div className= "col-sm-12 btn-info">
            Login With Google to Begin
          </div>
        </div>
        <div className="row">
          <div style={{'paddingTop': "20px"}} className="col-sm-12">
            
            <div>
            {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={this.handleLoginFailure} 
                cookiePolicy={"single_host_origin"}
                responseType="code,token"
                ></GoogleLogin>
        )}
        </div>

          {this.state.accessToken ? (
            <h5>
              Your Access Token: 
              <br />
              <br /> 
              {this.state.accessToken}
              
            </h5>
          ) : null}
          <br />
          {this.state.isLogined ? (
            <h5>
              Welcome {this.state.name}!
              <br />
              <img src={this.state.image} alt="profile picture"/>
              <br /> 
              Email: {this.state.email}
              
            </h5>
          ) : null}

        </div>

        </div>
      </div>
    )
  }

}
export default SigninPage;