import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();

  const isPersonAvailable =
    people === undefined ||
    people.findIndex(({ slug }) => slug === person.slug) === -1
      ? false
      : true;

  return (
    <>
      {isPersonAvailable ? (
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
        >
          {person.name}
        </Link>
      ) : (
        <SearchLink
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          params={{}}
        >
          {person.name}
        </SearchLink>
      )}
    </>
  );
};
