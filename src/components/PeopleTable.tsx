/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const getRelatedPerson = (
  name: string | null,
  people: Person[],
): Person | undefined => {
  if (!name) {
    return undefined;
  }

  return people.find(person => person.name === name);
};

const getSortIcon = (
  field: SortField,
  sort: string | null,
  order: string | null,
) => {
  if (sort !== field) {
    return 'fas fa-sort';
  }

  if (order === 'desc') {
    return 'fas fa-sort-down';
  }

  return 'fas fa-sort-up';
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getPersonUrl = (slug: string) => {
    const search = searchParams.toString();

    return {
      pathname: `/people/${slug}`,
      search: search ? `?${search}` : '',
    };
  };

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortedPeople = [...people].sort((personA, personB) => {
    if (!sort || !['name', 'sex', 'born', 'died'].includes(sort)) {
      return 0;
    }

    let result = 0;

    if (sort === 'name' || sort === 'sex') {
      result = personA[sort].localeCompare(personB[sort]);
    } else if (sort === 'born' || sort === 'died') {
      result = personA[sort] - personB[sort];
    }

    return order === 'desc' ? -result : result;
  });

  const renderSortButton = (field: SortField) => {
    return (
      <button
        type="button"
        className="button is-white p-0"
        onClick={() => handleSort(field)}
      >
        <span className="icon">
          <i className={getSortIcon(field, sort, order)} />
        </span>
      </button>
    );
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
              {renderSortButton('name')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {renderSortButton('sex')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {renderSortButton('born')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {renderSortButton('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = getRelatedPerson(person.motherName, people);
          const father = getRelatedPerson(person.fatherName, people);
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={getPersonUrl(person.slug)}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <Link
                      to={getPersonUrl(mother.slug)}
                      className={mother.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {mother.name}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <Link
                      to={getPersonUrl(father.slug)}
                      className={father.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {father.name}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
