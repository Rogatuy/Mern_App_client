import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkIsAuth } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';

import Navbar from '../../components/navbar/navbar';

import './registration.scss';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(status) toast(status);
    if(isAuth) {navigate(`${AppRoute.Main}`) };
  }, [isAuth, navigate, status]);

  const handleSubmitRegister = () => {
    try {
      dispatch(registerUser({name, email, password}));
      setName('');
      setEmail('');
      setPassword('');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
    <Navbar />
      <div className="container">
        <div className="registration-page">
          <h3>Registration</h3>
          <form className="form form-login" onSubmit={e => e.preventDefault()} noValidate>
            <div className="row">
            <div className="input-field col s12">
                <input 
                  id="name"
                  type="text"
                  name="user-name"
                  required = {true}
                  autoComplete="new-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input 
                  id="email"
                  type="email"
                  name="user-email"
                  required = {true}
                  autoComplete="new-email"
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
                  autoComplete="new-password"
                  required = {true}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className="row">
              <button
              className="wawes-effect wawes-light btn blue"
              onClick={handleSubmitRegister}
              >
                Registration
              </button>
              <Link to={AppRoute.Login} className="btn-outline btn-reg">You have account already?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}





export default Registration;
