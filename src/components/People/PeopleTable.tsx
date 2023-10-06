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

  if (query && query !== null) {
    displayedPeople = displayedPeople.filter(person => {
      const personName = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase();
      const fatherName = person.fatherName?.toLowerCase();
      const personMatch = personName.includes(query);
      const motherMatch = motherName?.includes(query);
      const fatherMatch = fatherName?.includes(query);

      return personMatch || motherMatch || fatherMatch;
    });
  }

  if (centuries.length > 0) {
    displayedPeople = displayedPeople.filter(person => centuries.includes(
      (Math.floor(person.born / 100) + 1).toString(),
    ));
  }

  if (sex !== null) {
    displayedPeople = displayedPeople.filter(person => person.sex === sex);
  }

  switch (sort) {
    case 'name':
    case 'sex':
      displayedPeople.sort((p1, p2) => {
        return order === 'desc'
          ? p2[sort].localeCompare(p1[sort])
          : p1[sort].localeCompare(p2[sort]);
      });
      break;
    case 'died':
    case 'born':
      displayedPeople.sort((p1, p2) => {
        return order === 'desc' ? p2[sort] - p1[sort] : p1[sort] - p2[sort];
      });
      break;
    default:
      break;
  }

  const setSortParam = (sortParameter: string): SearchParams => {
    if (sort === null || sort !== sortParameter) {
      return { sort: sortParameter, order: null };
    }

    switch (order) {
      default:
      case null:
        return { order: 'desc' };
      case 'desc':
        return { sort: null, order: null };
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
      {displayedPeople.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink
                    className="is-active"
                    params={setSortParam('name')}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    className="is-active"
                    params={setSortParam('sex')}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    className="is-active"
                    params={setSortParam('born')}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    className="is-active"
                    params={setSortParam('died')}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

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
      )}

    </>
  );
};
