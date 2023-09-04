import React from 'react';
import './ErrorPage.scss';

export const ErrorPage: React.FC = () => (
  <section className="error-page">
    <div className="container">
      <div className="error-page__content">
        <div className="error-page--bg">
          <h1 className="title">
            Page not found
          </h1>

        </div>

        <div className="error-page__description">
          <h3 className="label">
            Look like you&apos;re lost
          </h3>

          <p>
            the page you are looking for not avaible!
          </p>
        </div>
      </div>
    </div>
  </section>
);
