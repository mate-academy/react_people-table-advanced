import { useContext } from 'react';
import {
  Link,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParamsContext } from './SearchParamsContext';

const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[],
  selectedPersonSlug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  let visiblePeople = [...people];

  const { searchParams } = useContext(SearchParamsContext);

  const resolvedPath = useResolvedPath('../').pathname;
  const location = useLocation();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const currentSexFilter = searchParams.get('sex');
  const currentQueryFilter = searchParams.get('query');
  const currentCenturiesFilter = searchParams.getAll('centuries');

  if (currentSexFilter) {
    visiblePeople = visiblePeople.filter(({ sex }) => sex === currentSexFilter);
  }

  if (currentQueryFilter) {
    visiblePeople = visiblePeople.filter(({ name }) => {
      const nameLowercased = name.toLowerCase();
      const currentQueryFilterLowercased = currentQueryFilter.toLowerCase();

      return nameLowercased.includes(currentQueryFilterLowercased);
    });
  }

  if (currentCenturiesFilter.length) {
    visiblePeople = visiblePeople.filter(({ born, died }) => {
      const bornCentury = Math.ceil(born / 1000);
      const diedCentury = Math.ceil(died / 100);
      const personLifeCenturies = [bornCentury, diedCentury];

      return personLifeCenturies.some(century => (
        currentCenturiesFilter.includes(String(century))
      ));
    });
  }

  if (sort) {
    visiblePeople.sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);

        case 'born':
        case 'died':
          return personA[sort] - personB[sort];

        default:
          return 0;
      }
    });

    if (order) {
      visiblePeople.reverse();
    }
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortTypes.map(name => {
            const nameLowercased = name.toLowerCase();
            const isCurrentSortType = sort === nameLowercased;

            return (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        {
                          sort: isCurrentSortType && order
                            ? null : nameLowercased,
                          order: isCurrentSortType && !order
                            ? 'desc' : null,
                        },
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          { 'fa-sort': !isCurrentSortType },
                          { 'fa-sort-up': isCurrentSortType && !order },
                          { 'fa-sort-down': isCurrentSortType && order },
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.length
          ? (
            visiblePeople.map(person => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;

              const isSelected = slug === selectedPersonSlug;

              let father: Person | undefined;
              let mother: Person | undefined;

              if (fatherName) {
                father = people.find(({ name: personName }) => (
                  personName === fatherName
                ));
              }

              if (motherName) {
                mother = people.find(({ name: personName }) => (
                  personName === motherName
                ));
              }

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={classNames(
                    { 'has-background-warning': isSelected },
                  )}
                >
                  <td>
                    <Link
                      to={{
                        pathname: resolvedPath + slug,
                        search: location.search,
                      }}
                      className={classNames(
                        { 'has-text-danger': sex === 'f' },
                      )}
                    >
                      {name}
                    </Link>
                  </td>

                  <td>
                    {sex}
                  </td>

                  <td>
                    {born}
                  </td>

                  <td>
                    {died}
                  </td>

                  <td>
                    {mother
                      ? (
                        <Link
                          to={{
                            pathname: resolvedPath + mother.slug,
                            search: location.search,
                          }}
                          className="has-text-danger"
                        >
                          {motherName}
                        </Link>
                      )
                      : (
                        motherName || '-'
                      )}
                  </td>

                  <td>
                    {father
                      ? (
                        <Link
                          to={{
                            pathname: resolvedPath + father.slug,
                            search: location.search,
                          }}
                        >
                          {fatherName}
                        </Link>
                      )
                      : (
                        fatherName || '-'
                      )}
                  </td>
                </tr>
              );
            })
          )
          : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
      </tbody>
    </table>
  );
};
