import cn from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { columns } from './colums';

type Props = {
  loadedPeople: Person[]
};

export const PeopleTable:React.FC<Props> = ({ loadedPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visiblePersons, setVisiblePersons] = useState<Person[]>([]);
  const { personSlug } = useParams();
  const { search } = useLocation();

  const sortOrder = searchParams.get('order');
  const sortType = searchParams.get('sort');

  const getSortType = useCallback((name: string): string => {
    switch (true) {
      case name === sortType && sortOrder === 'asc':
        return 'fas fa-sort-up';
      case name === sortType && sortOrder === 'desc':
        return 'fas fa-sort-down';
      default:
        return 'fas fa-sort';
    }
  }, [sortType, sortOrder]);

  useEffect(() => {
    setVisiblePersons(loadedPeople);
  }, []);

  const filteredPeople = () => {
    let resultOfFiltering = [...loadedPeople];
    const queryFilter = searchParams.get('query');
    const centuryfilter = searchParams.getAll('century');
    const sexFilter = searchParams.get('sex');

    if (queryFilter?.length) {
      resultOfFiltering = resultOfFiltering
        .filter((person) => (
          person.name.toLowerCase().includes(queryFilter.toLowerCase())
          || person.motherName?.toLowerCase()
            .includes(queryFilter.toLowerCase())
          || person.fatherName?.toLowerCase()
            .includes(queryFilter.toLowerCase())
        ));
    }

    if (centuryfilter.length) {
      resultOfFiltering = resultOfFiltering
        .filter((person) => (
          centuryfilter.includes((Math.floor(person.born / 100).toString()))
        ));
    }

    if (sexFilter?.length) {
      resultOfFiltering = resultOfFiltering
        .filter(person => person.sex === sexFilter);
    }

    setVisiblePersons(resultOfFiltering);
  };

  useEffect(() => {
    filteredPeople();
  }, [loadedPeople, searchParams]);

  const setSort = useCallback((name: string) => {
    if (name === sortType) {
      switch (sortOrder) {
        case 'desc':
          searchParams.delete('order');
          searchParams.delete('sort');
          break;
        case 'asc':
          searchParams.set('order', 'desc');
          break;
        default:
          searchParams.set('order', 'asc');
      }
    } else {
      searchParams.set('sort', name);
      searchParams.set('order', 'asc');
    }

    setSearchParams(searchParams);
  }, [searchParams]);

  const sortedPeople = useMemo(() => {
    switch (sortType) {
      case 'Name':
        return [...visiblePersons].sort((a, b) => a.name.localeCompare(b.name));
      case 'Sex':
        return [...visiblePersons].sort((a, b) => a.sex.localeCompare(b.sex));
      case 'Born':
        return [...visiblePersons].sort((a, b) => a.born - b.born);
      case 'Died':
        return [...visiblePersons].sort((a, b) => a.died - b.died);
      default:
        return [...visiblePersons];
    }
  }, [searchParams, visiblePersons]);

  const visiblePeople = useMemo(() => {
    const currentPeople = sortOrder === 'desc'
      ? sortedPeople.reverse()
      : sortedPeople;

    return currentPeople;
  }, [sortType, sortOrder, visiblePersons]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.name}
                <Link
                  onClick={(event) => {
                    event.preventDefault();
                    setSort(column.name);
                  }}
                  to={`people/${search}`}
                >
                  {column.sortableBy && (
                    <span className="icon">
                      <i className={getSortType(column.name)} />
                    </span>
                  )}
                </Link>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visiblePeople.map(person => (
          <React.Fragment
            key={person.slug}
          >
            <tr
              data-cy="person"
              className={cn(
                {
                  'has-background-warning': (
                    personSlug === person.slug
                  ),
                },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? <PersonLink person={person.mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {person.father
                  ? <PersonLink person={person.father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
