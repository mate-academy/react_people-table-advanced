import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, SortBy } from '../../types';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSortedPeople } from '../../utils/sortedPeople';
import { getFilteredPeople } from '../../utils/filteredPeople';
import { PersonLink } from '../PesonLink';

interface Props {
  people: Person[],
  personSlug: string,
}

export const PeopleTable = React.memo<Props>(({ people, personSlug }) => {
  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') as keyof Person;
  const centuries = searchParams.getAll('centuries');
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = useMemo(() => (
    getFilteredPeople(
      people,
      query,
      sexFilter,
      centuries,
    )
  ), [people, query, sexFilter, centuries]);

  const sortedPeople = useMemo(() => (
    getSortedPeople(
      visiblePeople,
      sort,
      isReversed,
    )
  ), [visiblePeople, sort, isReversed]);

  if (!sortedPeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  const updateSearchParams = (sortBy: SortBy) => {
    if (!sort || sort !== sortBy) {
      return ({
        sort: sortBy,
        order: null,
      });
    }

    if (sort && !isReversed) {
      return ({
        sort: sortBy,
        order: 'desc',
      });
    }

    return ({
      sort: null,
      order: null,
    });
  };

  const handleSortStyle = (sortBy: SortBy) => {
    if (sort === sortBy && !isReversed) {
      return 'fas fa-sort-up';
    }

    if (sort === sortBy && isReversed) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
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
              <SearchLink
                params={updateSearchParams(SortBy.Name)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={updateSearchParams(SortBy.Sex)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={updateSearchParams(SortBy.Born)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={updateSearchParams(SortBy.Died)}
              >
                <span className="icon">
                  <i className={handleSortStyle(SortBy.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          const motherNameResult = motherName || '-';
          const fatherNameResult = fatherName || '-';

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {person.mother
                  ? (<PersonLink person={person.mother} />)
                  : (
                    motherNameResult
                  )}
              </td>

              <td>
                {person.father
                  ? (<PersonLink person={person.father} />)
                  : (
                    fatherNameResult
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
