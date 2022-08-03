import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { People } from '../types/People';

type Props = {
  human: string | People;
};

const PersonName:FC<Props> = ({ human }) => {
  const isHumanExists = typeof human === 'string';
  const location = useLocation();

  if (!isHumanExists) {
    return (
      <Link
        to={`/people/${human?.slug}/${location.search}`}
        style={human?.sex === 'f'
          ? { color: 'rgb(0, 71, 171)' }
          : { color: 'rgb(255, 0, 0)' }}
      >
        {human?.name}
      </Link>
    );
  }

  return (
    <p style={{ fontWeight: 'bold' }}>{human}</p>
  );
};

export default PersonName;
