import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
// Types
import { Person } from '../../types/Person/Person';

type Props = {
  person: Person;
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const { name, born, sex } = person;
  const { search } = useLocation();
  const personUrl = `${name.toLocaleLowerCase().replace(/ /g, '-')}-${born}`;

  return (
    <Link
      to={{ pathname: personUrl, search }}
      className={classNames('PersonName', { 'PersonName--female': sex !== 'm' })}
    >
      {name}
    </Link>
  );
};
