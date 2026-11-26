import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import { getSearchWith, SearchParams } from '../utils/searchHelper';

import { Person } from '../types';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  person: Person;
  peoples: Person[];
};

export const SearchLink: React.FC<Props> = ({
  peoples,
  person,
  children,
  params,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const findPerson = peoples.find(people => people.name === person.name);

  return (
    <>
      {findPerson ? (
        <Link
          to={{
            pathname: `/people/${findPerson.slug}`,
            search: getSearchWith(params, searchParams),
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <span className={person.sex === 'f' ? 'has-text-danger' : ''}>
          {person.name}
        </span>
      )}
    </>
  );
};
