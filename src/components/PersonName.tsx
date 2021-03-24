import React from 'react';
import { Link } from 'react-router-dom';

export const PersonName = (props: {
  name: string;
  sex: string;
  slug: string;
}) => {
  const { name, sex, slug } = props;

  const setColor = () => {
    if (sex === 'f') {
      return 'red';
    }

    if (sex === 'm') {
      return 'blue';
    }

    return 'black';
  };

  return (
    <Link
      to={`/people/${slug}`}
      style={{
        color: setColor(),
      }}
    >
      {name}
    </Link>
  );
};
