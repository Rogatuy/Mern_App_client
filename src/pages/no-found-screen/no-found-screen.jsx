import React from 'react'
import { Link} from 'react-router-dom';

import Navbar from '../../components/navbar/navbar';
import { AppRoute } from '../../const';

import './no-found-page.scss';

const NoFoundScreen = () => {

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="no-found-screen-page">
          <h4>Такой страницы нет, увы.</h4>
            <div className="row">
              <Link to={AppRoute.Main} className="wawes-effect wawes-light btn btn blue">На главную</Link>
            </div>
          </div>
      </div>
    </React.Fragment>
  )
}

export default NoFoundScreen;
