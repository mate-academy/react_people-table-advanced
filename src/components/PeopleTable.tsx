import classNames from 'classnames';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortHeaders } from '../types/SortHeaders';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable: FC<Props> = memo(({ people, selectedSlug }) => {
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isSelected = useCallback((slug: string) => (
    slug === selectedSlug
  ), [selectedSlug]);

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

  const sortPeople = useCallback((peopleToSort: Person[]) => {
    const sortedListOfPeople = [...peopleToSort].sort((
      firstPerson,
      secondPerson,
    ) => {
      switch (sort) {
        case SortHeaders.Name:
        case SortHeaders.Sex:
          return firstPerson[sort].localeCompare(secondPerson[sort]);
        case SortHeaders.Born:
        case SortHeaders.Died:
          return firstPerson[sort] - secondPerson[sort];
        default:
          return 0;
      }
    });

    return (
      order === 'desc'
        ? sortedListOfPeople.reverse()
        : sortedListOfPeople
    );
  }, [searchParams]);

  const hasValueAndOrder = useCallback((value: string) => (
    sort === value && order
  ), [searchParams]);

  const hasValueNoOrder = useCallback((value: string) => (
    sort === value && !order
  ), [searchParams]);

  useEffect(() => {
    setSortedPeople(sortPeople(people));
  }, [people, searchParams]);

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
              { 'has-background-warning': isSelected(slug) },
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
