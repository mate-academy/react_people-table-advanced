import React from 'react';
import pnf from '../../images/404.png';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => (
  <div className="errorPage">
    <div className="errorPage__content">
      <img
        className="errorPage__image"
        src={pnf}
        alt="404 Page not found"
      />
      <p>404 Page Not Found</p>
    </div>
  </div>
);
