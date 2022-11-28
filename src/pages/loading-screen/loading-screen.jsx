import React from 'react';
import './loading-screen.scss';

const LoadingScreen = () => {
  return (
    <div className='wrapper'>
      <p>Loading data, please wait or try reloading the page.</p>
      <div className='dualRing' ></div>
    </div>
  );
}

export default LoadingScreen;
