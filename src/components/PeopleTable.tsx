import classNames from 'classnames';
import {
  FC,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortHeaders } from '../types/SortHeaders';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getSortedPeople } from '../utils/getSortedPeople';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable: FC<Props> = memo(({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';
  const query = searchParams.get('query');
  const sexFilter = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const renderParent = useCallback((parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    return (
      parent
        ? <PersonLink person={parent} />
        : parentName
    );
  }, []);

  const visiblePeople = useMemo(() => (
    getFilteredPeople(people, query, sexFilter, centuries)
  ), [people, query, sexFilter, centuries]);

  const sortedPeople = useMemo(() => (
    getSortedPeople(visiblePeople, sort, isReversed)
  ), [visiblePeople, sort, isReversed]);

  const hasValueAndOrder = useCallback((value: string) => (
    sort === value && isReversed
  ), [searchParams]);

  const hasValueNoOrder = useCallback((value: string) => (
    sort === value && !isReversed
  ), [searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortHeaders).map(([key, value]) => (
            <th key={key}>
              <span
                className="is-flex is-flex-wrap-nowrap"
              >
                {key}
                <SearchLink
                  params={({
                    sort: hasValueAndOrder(value)
                      ? null
                      : value,
                    order: hasValueNoOrder(value)
                      ? 'desc'
                      : null,
                  })}
                >
                  <span className="icon">
                    <i className={classNames(
                      'fas',
                      { 'fa-sort': sort !== value },
                      { 'fa-sort-up': hasValueNoOrder(value) },
                      { 'fa-sort-down': hasValueAndOrder(value) },
                    )}
                    />
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
        {sortedPeople.map(({
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
        }) => (
          <tr
            key={slug}
            data-cy="person"
            className={classNames(
              { 'has-background-warning': slug === selectedSlug },
            )}
          >
            <td>
              <PersonLink person={{ name, sex, slug }} />
            </td>

            <td>{sex}</td>

            <td>{born}</td>

            <td>{died}</td>

            <td>
              {renderParent(motherName)}
            </td>

            <td>
              {renderParent(fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
