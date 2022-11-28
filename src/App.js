import './App.scss';
import Login from './pages/login/login';
import Registration from './pages/registration/registration';
import MainPage from './pages/main-page/main-page';
import NoFoundScreen from './pages/no-found-screen/no-found-screen';

import { AppRoute } from './const';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { getMe } from '../src/redux/features/auth/authSlice';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  return (
    <div className="app">  
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />}/>
        <Route path={AppRoute.Login} element={<Login />}/>
        <Route path={AppRoute.Registration} element={<Registration />}/>
        <Route path={AppRoute.NoFoundScreen} element={<NoFoundScreen />}/>
      </Routes>
      <ToastContainer position = 'bottom-right' />
    </div>
  );
}

export default App;
