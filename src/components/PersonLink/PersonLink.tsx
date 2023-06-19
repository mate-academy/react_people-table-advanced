import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';
import { Filter } from '../../types/Filter';

interface Props {
  person: Person,
  isSelected: (person: Person) => boolean,
};

export const PersonLink: FC<Props> = ({ person, isSelected }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const {
    name,
    slug,
    sex,
  } = person;

  return (
    <Link
      to={{
        pathname: isSelected(person) ? parentPath : parentPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === Filter.Female })}
    >
      {name}
    </Link>
  );
};
