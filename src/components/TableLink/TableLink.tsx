import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const TableLink: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
