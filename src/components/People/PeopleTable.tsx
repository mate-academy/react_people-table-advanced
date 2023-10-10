import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonRow } from '../Person/PersonRow';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type PeopleTableProps = {
  people: Person[]
  clickedPersonSlug?: string
};

export const PeopleTable = (
  { people, clickedPersonSlug }: PeopleTableProps,
) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  let displayedPeople = [...people];
  const sortedFields = ['name', 'sex', 'born', 'died'];

  const checkMatchQuery = (checkedName: string | null) => {
    return query && checkedName?.toLowerCase().includes(query);
  };

  if (query) {
    displayedPeople = displayedPeople.filter(person => (
      checkMatchQuery(person.name)
        || checkMatchQuery(person.motherName)
        || checkMatchQuery(person.fatherName)
    ));
  }

  if (centuries.length) {
    displayedPeople = displayedPeople.filter(person => centuries.includes(
      (Math.floor(person.born / 100) + 1).toString(),
    ));
  }

  if (sex) {
    displayedPeople = displayedPeople.filter(person => person.sex === sex);
  }

  displayedPeople.sort((p1, p2) => {
    let [person1, person2] = [p1, p2];

    if (order === 'desc') {
      [person2, person1] = [person1, person2];
    }

    switch (sort) {
      case 'name':
      case 'sex':
        return person1[sort].localeCompare(person2[sort]);

      case 'born':
      case 'died':
        return person1[sort] - person2[sort];

      default:
        return 0;
    }
  });

  const setSortParam = (sortParameter: string): SearchParams => {
    if (!sort || sort !== sortParameter) {
      return { sort: sortParameter, order: null };
    }

    switch (order) {
      case 'desc':
        return { sort: null, order: null };
      default:
      case null:
        return { order: 'desc' };
    }
  };

  const setSortColumnClasses = (sortBy: string) => {
    return classNames('fas', {
      'fa-sort': sort !== sortBy,
    }, {
      'fa-sort-down': sort === sortBy && order === 'desc',
    }, {
      'fa-sort-up': sort === sortBy && order === null,
    });
  };

  return (
    <>
      {displayedPeople.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sortedFields.map(field => (
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {field[0].toUpperCase() + field.slice(1)}
                    <SearchLink
                      className="is-active"
                      params={setSortParam(field)}
                    >
                      <span className="icon">
                        <i className={setSortColumnClasses(field)} />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {displayedPeople.map(person => {
              const child = { ...person };

              child.father = people.find(
                father => father.name === child.fatherName,
              );

              child.mother = people.find(
                mother => mother.name === child.motherName,
              );

              return (
                <PersonRow
                  key={child.slug}
                  person={child}
                  clickedPersonSlug={clickedPersonSlug}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}

    </>
  );
};
