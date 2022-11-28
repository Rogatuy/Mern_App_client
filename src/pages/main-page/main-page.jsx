import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { removeUser, getAllUsers , blockedUser, unblockedUser} from '../../redux/features/users/usersSlice';
import { checkIsAuth, logOut } from '../../redux/features/auth/authSlice';

import TableRow from '../../components/table-row/table-row';
import Navbar from '../../components/navbar/navbar';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { AppRoute } from '../../const';
import './main-page.scss';

const MainPage = () => {
  
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const idLocalStorage = window.localStorage.getItem('_id');

  const [allCheckboxes, setAllCheckboxes] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);

  const {users} = useSelector(state => state.allUsers);
  const {isLoading} = useSelector(state => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    if(!isAuth) {navigate(`${AppRoute.Login}`)};
  }, [dispatch, isAuth, navigate]);

  
  useEffect(() => {
    const inputId = users.map(element => element._id);
    allCheckboxes ? setCheckboxes(inputId) : setCheckboxes([]);
  }, [allCheckboxes, users]);

  const changeCheckboxes = (id) => {
    setCheckboxes(
      checkboxes.includes(id)
      ? checkboxes.filter((el) => el !== id)
      : [...checkboxes, id]
    );
  };

  const letDeleteUser = (_id) => {
    try {
      dispatch(removeUser(_id));
    } catch(error) {
      console.log(error);
    }
  }

  const letBlockedUser = (_id) => {
    try {
      dispatch(blockedUser({_id}));
    } catch(error) {
      console.log(error);
    }
  }

  const letUnblockedUser = (_id) => {
    try {
      dispatch(unblockedUser({_id}));
    } catch(error) {
      console.log(error);
    }
  }

  const handleDeleteButton = () => {
    checkboxes.map((id) => letDeleteUser(id));
    setAllCheckboxes(false);
    if (checkboxes.includes(idLocalStorage)) {
      dispatch(logOut());
      window.localStorage.removeItem('_id');
      window.localStorage.removeItem('token');
    }
    setCheckboxes([]);
  }

  const handleBlockedButton = () => {
    checkboxes.map((id) => letBlockedUser(id));
    setAllCheckboxes(false);
    if (checkboxes.includes(idLocalStorage)) {
      dispatch(logOut());
      window.localStorage.removeItem('_id');
      window.localStorage.removeItem('token');
    }
    setCheckboxes([]);
  }

  const handleUnblockedButton = () => {
    checkboxes.map((id) => letUnblockedUser(id));
    setAllCheckboxes(false);
    setCheckboxes([]);
  }

  if(isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="main-page">
          <div className="container center">
            <h4>All users</h4>
            <div className="row">
              <button 
                className='waves-effect waves-light btn blue change-button'
                onClick={handleBlockedButton}
              >
                Block
              </button>
              <button 
                className='waves-effect waves-light btn blue change-button'
                onClick={handleUnblockedButton}
              >
                Unblock
                </button>
              <button 
                className='waves-effect waves-light btn blue change-button'
                onClick={handleDeleteButton}
              >
                  Delete
              </button>
            </div>
          </div>
          <table className="striped">
            <thead>
              <tr>
                <th>
                  <button 
                    className='waves-effect waves-light btn blue'
                    onClick={() => setAllCheckboxes(!allCheckboxes)}
                    >            
                  Select/Unselect all
                  </button>
                </th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>DateRegistration</th>
                <th>LastLogin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => (
            <TableRow
              key={user._id}
              _id={user._id}
              name={user.name}
              email={user.email}
              dateRegistration={user.createdAt}
              dateLogin={user.lastLoginDate}
              status={user.blocked}
              checked={checkboxes.includes(user._id)}
              onChange={(event) => changeCheckboxes(event.target.id)}
            />
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MainPage;
