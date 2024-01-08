import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { Person } from '../types';

type PersonInfoProps = {
  person: Person;
  people: Person[] | undefined;
};

export const PersonInfo = ({ person, people }: PersonInfoProps) => {
  const location = useLocation();
  const personFather = people?.find(p => p.name === person.fatherName);
  const personMother = people?.find(p => p.name === person.motherName);
  const [searchParams] = useSearchParams();

  const { slug, sex } = person;

  return (
    <>
      <tr
        data-cy="person"
        className={`has-background-warning ${location.pathname === `/people/${slug}` ? 'is-active' : ''}`}
      >
        <td>
          { /* ... */ }
        </td>
        <td>{sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {personMother ? (
            <NavLink
              className="has-text-danger"
              to={`/people/${personMother.slug}?${searchParams.toString()}`}
            >
              {personMother.name}
            </NavLink>
          ) : person.motherName || '-'}
        </td>
        <td>
          {personFather ? (
            <NavLink
              to={`/people/${personFather.slug}?${searchParams.toString()}`}
            >
              {personFather.name}
            </NavLink>
          ) : person.fatherName || '-'}
        </td>
      </tr>
    </>
  );
};
