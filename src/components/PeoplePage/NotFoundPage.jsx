import React from 'react';
import notFoundImage from '../images/not-found.svg';

const NotFoundPage = () => (
  <div className="page page--not-found">
    <p>Page not found</p>

    <img src={notFoundImage} alt="not-found" />
  </div>
);

export default NotFoundPage;
