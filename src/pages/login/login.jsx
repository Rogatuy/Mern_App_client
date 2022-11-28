import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkIsAuth } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';

import Navbar from '../../components/navbar/navbar';
import LoadingScreen from '../loading-screen/loading-screen';

import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.auth);

  useEffect(() => {
    if(status) toast(status);
    if(isAuth) {navigate(`${AppRoute.Main}`) };
  }, [isAuth, navigate, status]);

  const handleSubmitLogin = () => {
    try {
      dispatch(loginUser({email, password}))
      setEmail('')
      setPassword('')
    } catch(error) {
      console.log(error);
    }
  }

   if(isLoading) {
    return (
      <LoadingScreen />
    );
  }


  return (
    <>
      <Navbar />
      <div className="container">
        <div className="login-page">
          <h3>Authorization</h3>
          <form className="form form-login" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="input-field col s12">
                <input 
                  id="email"
                  type="email"
                  name="user-email"
                  className="validate"
                  required = {true}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input 
                  id="password"
                  type="password"
                  name="user-password"
                  className="validate"
                  required = {true}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <button
              className="wawes-effect wawes-light btn btn blue"
              onClick={handleSubmitLogin}
              >
                Enter
              </button>
              <Link to={AppRoute.Registration} className="btn-outline btn-reg">Are you don't have account?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
