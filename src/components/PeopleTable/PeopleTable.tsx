import { memo, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { SortBy } from '../../types/Sortby';
import { getSortedPeople } from '../../utils/sortedPeople';
import { getFilteredPeople } from '../../utils/filtredPeople';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = memo(({ people }) => {
  const [searchParams] = useSearchParams();
  const { selectedSlug = '' } = useParams();

  const sort = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries');

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

          // const hasSelected = slug === selectedSlug;
          const selectedMother = people.find(mom => mom.name === motherName);
          const selectedFather = people.find(dad => dad.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {!selectedMother
                  ? (motherName || '-')
                  : <PersonLink person={selectedMother} />}
              </td>

              <td>
                {!selectedFather
                  ? (fatherName || '-')
                  : <PersonLink person={selectedFather} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
