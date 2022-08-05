import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <div className="hero-body">
    <div className="container has-text-centered">
      <p className="title">
        People Population
      </p>

      <p className="subtitle">
        <Link to="/people">Start</Link>
      </p>
    </div>
  </div>
);
