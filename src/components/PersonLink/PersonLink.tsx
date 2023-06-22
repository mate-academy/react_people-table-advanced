import { FC } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
  selectedSlug: string | undefined
};

export const PersonLink: FC<Props> = ({ person, selectedSlug }) => {
  const isSelected = (persone: Person) => persone.slug === selectedSlug;
  const location = useLocation();
  const {
    sex,
    slug,
    name,
  } = person;

  return (
    <Link
      to={{
        pathname: isSelected(person) ? '/people' : `/people/${slug}`,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
