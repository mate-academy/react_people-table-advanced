import React from 'react';
import { Link } from 'react-router-dom';

export const PersonAddButton: React.FC = () => (
  <Link
    to="/people/new"
    className="button is-success"
  >
    Add a person
  </Link>
);
