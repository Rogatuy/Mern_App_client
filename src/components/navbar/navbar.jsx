import React from 'react';
import './navbar.scss';
import { Link} from 'react-router-dom';
import {checkIsAuth, logOut} from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
    window.localStorage.removeItem('_id');
    window.localStorage.removeItem('token');
    toast('Exit user');
  }

  return (

    <nav>
      <div className="nav-wrapper navbar blue">
        <p className="brand-logo">FOURTH_HOMEWORK</p>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isAuth 
          ? <li><Link to="/login" onClick={logoutHandler}>Exit User</Link></li>
          : <li><Link to="/login">Enter User</Link></li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
