import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person;
  isSelected: (value: Person) => boolean;
};

export const PersonLink: FC<Props> = ({ people, isSelected }) => {
  const location = useLocation();

  return (
    <td>
      <Link
        to={{
          pathname: isSelected(people)
            ? '/people/'
            : `/people/${people.slug}`,
          search: location.search,
        }}
        className={classNames(people.sex === 'f' ? 'has-text-danger' : '')}
      >
        {people.name}
      </Link>
    </td>
  );
};
