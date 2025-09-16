import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { useContext } from 'react';
import { SearchParamsContext } from '../store/searchHelper';

type PersonLinkType = {
  person: Person | null;
};

export const PersonLink: React.FC<PersonLinkType> = ({ person }) => {
  const { searchParams } = useContext(SearchParamsContext);

  if (!person) {
    return <span>-</span>;
  }

  if (!person.slug) {
    return <p>{person.name}</p>;
  }

  const currentSlug = `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`;

  return (
    <Link
      to={{
        pathname: `/people/${currentSlug}`,
        search: searchParams.toString() ? `?${searchParams.toString()}` : '',
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
