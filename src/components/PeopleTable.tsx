import {
  Link,
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface PersonRowProps {
  person: Person;
}

// "#/people?sort=name"

const PersonRow = ({ person }: PersonRowProps) => {
  const { slug } = useParams();
  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          to={{ pathname: `/people/${person.slug}`, search: location.search }}
          end
          className={person.sex === 'f' ? 'has-text-danger' : ' '}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          person.mother ? (
            <NavLink
              to={{
                pathname: `/people/${person.mother.slug}`,
                search: location.search,
              }}
              end
              className={person.sex === 'f' ? ' ' : 'has-text-danger'}
            >
              {person.motherName}
            </NavLink>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          person.father ? (
            <NavLink
              className={person.sex === 'f' ? 'has-text-danger' : ' '}
              to={{
                pathname: `/people/${person.father.slug}`,
                search: location.search,
              }}
              end
            >
              {person.fatherName}
            </NavLink>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();

  const enrichedPeople = people.map(person => {
    return {
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    };
  });

  const toggleLink = (value: string) => {
    const sortField = searchParams.get('sort');
    const hasOrder = searchParams.has('order');

    if (sortField !== value) {
      return getSearchWith(searchParams, { sort: value, order: null });
    }

    if (!hasOrder) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={{
                  search: toggleLink('name'),
                }}
              >
                <span className="icon">
                  <i
                    className={
                      searchParams.get('sort') === 'name'
                        ? searchParams.has('order')
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: toggleLink('sex') }}>
                <span className="icon">
                  <i
                    className={
                      searchParams.get('sort') === 'sex'
                        ? searchParams.has('order')
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: toggleLink('born') }}>
                <span className="icon">
                  <i
                    className={
                      searchParams.get('sort') === 'born'
                        ? searchParams.has('order')
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: toggleLink('died') }}>
                <span className="icon">
                  <i
                    className={
                      searchParams.get('sort') === 'died'
                        ? searchParams.has('order')
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {enrichedPeople.map(person => {
          return <PersonRow key={person.slug} person={person} />;
        })}
      </tbody>
    </table>
  );
};
