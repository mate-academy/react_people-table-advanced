import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="NotFoundPage">
      <div className="d-grid gap-5">
        <div className="NotFoundPage__text">
          <h1 className="text-center">Page not found</h1>
          <h2 className="text-center">{'¯\\_(ツ)_/¯'}</h2>
        </div>

        <Link
          to="/"
          className="btn btn-primary w-25 mx-auto btn-lg"
        >
          Return to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
