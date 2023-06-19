import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  isSelected: (person: Person) => boolean,
};

export const PersonLink: FC<Props> = ({ person, isSelected }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const {
    name,
  } = person;

  return (
    <Link
      to={{
        pathname: isSelected(person) ? parentPath : parentPath + person.slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
