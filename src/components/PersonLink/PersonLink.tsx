import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { Person, Sex } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink = ({ person }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: getSearchWith(searchParams, {}),
      }}
      className={person.sex === ('f' as Sex) ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
