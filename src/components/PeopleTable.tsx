import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const selectedCentury = searchParams.get('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');

  const filterPeople = (persons: Person[]) => {
    return persons.filter(person => {
      if (
        selectedCentury &&
        Math.floor(person.born / 100) + 1 !== parseInt(selectedCentury)
      ) {
        return false;
      }

      if (query && !person.name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      if (sex && person.sex !== sex) {
        return false;
      }

      return true;
    });
  };

  const sortPeople = (
    filteredPeople: Person[],
    sortField: string,
    sortOrder: string,
  ) => {
    return people.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  };

  const findSlug = (list: Person[], name: string) => {
    const person = list.find(pers => pers.name === name);

    return person && person.slug;
  };

  const updateSearchParams = (newParams: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });
  };

  const handleSort = (field: string) => {
    let newOrder = 'asc';

    if (sort === field && order === 'asc') {
      newOrder = 'desc';
    }

    if (sort === field && order === 'desc') {
      newOrder = '';
    }

    updateSearchParams({
      sort: newOrder ? field : '',
      order: newOrder || '',
    });
  };

  const filteredPeople = filterPeople(people);

  const sortedPeople =
    sort && order ? sortPeople(filteredPeople, sort, order) : filteredPeople;

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
              <a href="#/" onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/" onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/" onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/" onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink
                name={person.name}
                sex={person.sex}
                slug={person.slug}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                findSlug(people, person.motherName) ? (
                  <PersonLink
                    name={person.motherName}
                    sex={'f'}
                    slug={findSlug(people, person.motherName)!}
                  />
                ) : (
                  <span>{person.motherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                findSlug(people, person.fatherName) ? (
                  <PersonLink
                    name={person.fatherName}
                    sex={'m'}
                    slug={findSlug(people, person.fatherName)!}
                  />
                ) : (
                  <span>{person.fatherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
