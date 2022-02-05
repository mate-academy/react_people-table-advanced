import React from 'react';
import './HomePage.scss';
import pic from '../img/claws-paws.gif';

export const HomePage: React.FC = () => (
  <>
    <div className="wrapper">
      <h1 className="hp__title">Home Page</h1>
      <br />
      <img src={pic} alt="cats :)" />
    </div>
  </>
);
