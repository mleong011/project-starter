import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import SigninPage from './pages/SigninPage';
import Dashboard from './pages/Dashboard';
// import GoogleBtn from './components/GoogleBtn';
import PrivateRoute from './components/PrivateRoute';
// import AuthButton from './components/AuthButton';
// import LoginPage from './pages/LoginPage';


import './App.css';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">Micro Blog</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/new">
            Create a Micro Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/sign-in">
            Sign In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/dashboard">
            Dashboard
          </NavLink> 
         </li>
         <li className="nav-item">
         {/* <AuthButton /> */}
         </li>
         
      </ul>
          {/* <GoogleBtn/> */}
    </nav>
  );
}





class App extends React.Component {

  render() {
    return (
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
              <PrivateRoute path="/posts/" component={PostFormPage} />
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route exact path="/" component={PostsListPage} />
                <Route path="/sign-in" component={SigninPage}/>
                <Route path='/dashboard' component={Dashboard}/>
                {/* <Route path="/login" component={SigninPage} /> */}
                
              
              </Switch>
             
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
