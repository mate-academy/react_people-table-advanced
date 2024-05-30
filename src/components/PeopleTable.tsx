import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useParams, useSearchParams } from 'react-router-dom';
import filterPeople from '../utils/filterPeople';
import sortArray from '../utils/sortArray';
import { useMemo } from 'react';

type Props = {
  people: Person[];
};

type SortType = 'Name' | 'Sex' | 'Born' | 'Died';

const THEADS_TO_SORT: SortType[] = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const personByName = useMemo(() => {
    const personMap: Record<string, Person> = {};

    people.forEach(person => {
      personMap[person.name] = person;
    });

    return personMap;
  }, [people]);

  let filteredPeople = filterPeople(people, {
    sex: searchParams.get('sex') || 'All',
    query: searchParams.get('query') || '',
    centuries: searchParams.getAll('centuries') || [],
  });

  filteredPeople = sortArray(filteredPeople, currentSort, currentOrder);

  function handleSortClick(sortField: SortType) {
    if (sortField === currentSort) {
      if (currentOrder === 'asc') {
        return {
          sort: currentSort,
          order: 'desc',
        };
      }

      if (currentOrder === 'desc') {
        return {
          sort: null,
          order: null,
        };
      }
    }

    return {
      sort: sortField,
      order: 'asc',
    };
  }

  function getIconClass(sortField: SortType) {
    return classNames('fas', {
      'fa-sort': currentSort !== sortField,
      'fa-sort-up': currentSort === sortField && currentOrder === 'asc',
      'fa-sort-down': currentSort === sortField && currentOrder === 'desc',
    });
  }

  if (filteredPeople.length === 0) {
    return (
      <p data-cy="noFilteredPeopleMessage">
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {THEADS_TO_SORT.map(THEAD => (
          <th key={THEAD}>
            <span className="is-flex is-flex-wrap-nowrap">
              {THEAD}
              <SearchLink params={handleSortClick(THEAD)}>
                <span className="icon">
                  <i className={getIconClass(THEAD)} />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </thead>
      <tbody>
        {filteredPeople.map(person => {
          const mother = person.motherName
            ? personByName[person.motherName]
            : null;
          const father = person.fatherName
            ? personByName[person.fatherName]
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} searchParams={searchParams} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} searchParams={searchParams} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} searchParams={searchParams} />
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
