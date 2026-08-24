/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  people: Person[];
  allPeople: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, allPeople }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (currentSearch !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (currentOrder !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getSortIcon = (field: SortField) => {
    if (currentSearch !== field) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const getPersonLink = (personSlug: string) => {
    const search = searchParams.toString();

    return `#/people/${personSlug}${search ? `?${search}` : ''}`;
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
              <button
                type="button"
                onClick={() => handleSort('name')}
                className="button is-white p-1"
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                onClick={() => handleSort('sex')}
                className="button is-white p-1"
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                onClick={() => handleSort('born')}
                className="button is-white p-1"
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                onClick={() => handleSort('died')}
                className="button is-white p-1"
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = allPeople.find(
            personFromList => personFromList.name === person.motherName,
          );

          const father = allPeople.find(
            personFromList => personFromList.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <a
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  href={getPersonLink(person.slug)}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {mother ? (
                  <a
                    className="has-text-danger"
                    href={getPersonLink(mother.slug)}
                  >
                    {mother.name}
                  </a>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <a href={getPersonLink(father.slug)}>{father.name}</a>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
