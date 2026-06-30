import { useOutletContext } from 'react-router-dom';
import { Person } from '../types';
import { findParent } from '../utils/findParent';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { useProjectParams } from '../utils/useProjectParams';
import { SearchLink } from './SearchLink';
import { sortPeople } from '../utils/sortPeople';
import { filterPeople } from '../utils/filterPeople';
import { SortIcon } from './SortArrows';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useOutletContext<{ people: Person[] }>();
  const { slug, search } = useProjectParams();
  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const isSortingDescending = search.order === 'desc';

  let filteredPeople = [...people];

  if (search.centuries?.length) {
    filteredPeople = filterPeople(people, 'centuries', search.centuries);
  }

  if (search.sex) {
    filteredPeople = filterPeople(filteredPeople, 'sex', search.sex);
  }

  if (search.query) {
    const query = search.query.toLowerCase();

    filteredPeople = filterPeople(filteredPeople, 'query', query);
  }

  let sortedPeople = filteredPeople;

  if (search.sort) {
    sortedPeople = sortPeople(
      filteredPeople,
      search.sort as keyof Person,
      !!search.order,
    );
  }

  return (
    <>
      {sortedPeople.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columnNames.map(columnName => {
                const normalizedColumnName = columnName.toLowerCase();

                const searchParam =
                  search.sort === normalizedColumnName
                    ? isSortingDescending
                      ? { sort: null, order: null }
                      : { sort: normalizedColumnName, order: 'desc' }
                    : { sort: normalizedColumnName, order: null };

                return (
                  <th key={columnName}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {columnName}
                      {columnName !== 'Mother' && columnName !== 'Father' && (
                        <SearchLink params={searchParam}>
                          {
                            <SortIcon
                              columnName={columnName}
                              currentSort={search.sort}
                              currentOrder={search.order}
                            />
                          }
                        </SearchLink>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          {sortedPeople.map((person, index) => {
            const mother = findParent(person.motherName, people);
            const father = findParent(person.fatherName, people);

            const rowKey = `${person.name}-${index}`;
            const isRowHighlighted = person.slug === slug;

            return (
              <tbody key={rowKey}>
                <tr
                  data-cy="person"
                  className={cn({ 'has-background-warning': isRowHighlighted })}
                >
                  <PersonLink person={person} />
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <PersonLink person={mother || '-'} />
                  <PersonLink person={father || '-'} />
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </>
  );
};
