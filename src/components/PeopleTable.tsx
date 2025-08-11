import { useCallback, useContext, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { StateContext } from '../store/GlobalContextProvider';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { compareValues } from '../utils/compareUtil';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(StateContext);
  const { slug: slugParam } = useParams();

  const sortableHeaders = ['Name', 'Sex', 'Born', 'Died'];
  const unsortableHeader = ['Mother', 'Father'];

  const [searhParams] = useSearchParams();
  const [sort, order] = useMemo(() => {
    return [searhParams.get('sort'), searhParams.get('order')];
  }, [searhParams]);

  const handleSortOrder = useCallback(
    (sortParam: string | null, orderParam: string | null) => {
      if (sort && sort === sortParam) {
        return orderParam === 'desc'
          ? { sort: null, order: null }
          : { sort: sortParam, order: 'desc' };
      } else {
        return { sort: sortParam, order: 'asc' };
      }
    },
    [sort],
  );

  const filterPeopleCallback = useCallback(
    (person: Person) => {
      const centuryFilter: boolean[] = [];
      const filters: boolean[] = [];

      Array.from(searhParams.entries()).forEach(([key, value]) => {
        switch (key) {
          case 'sex': {
            if (value) {
              filters.push(value === person.sex);
            }

            break;
          }

          case 'centuries': {
            if (value) {
              centuryFilter.push(
                value.includes(`${Math.ceil(person.born / 100)}`),
              );
            }

            break;
          }

          case 'query': {
            if (value) {
              const { name, mother, father } = person;
              const lowerCaseValue = value.toLowerCase();
              const nameFound = name.toLowerCase().includes(lowerCaseValue);
              const motherFound =
                mother?.name.toLowerCase().includes(lowerCaseValue) || false;
              const fatherFound =
                father?.name.toLowerCase().includes(lowerCaseValue) || false;

              filters.push(nameFound || motherFound || fatherFound);
            }

            break;
          }

          default:
            filters.push(true);
        }
      });

      if (centuryFilter.length) {
        filters.push(centuryFilter.some(value => value));
      }

      return filters.every(value => value);
    },
    [searhParams],
  );

  const sortPeopleCallback = useCallback(
    (p1: Person, p2: Person) => {
      const sortParam = searhParams.get('sort') as keyof Person;
      const orderParam = searhParams.get('order');

      if (!sortParam) {
        return 0;
      }

      const orderRatio = orderParam === 'asc' ? 1 : -1;

      return orderRatio * compareValues(p1[sortParam], p2[sortParam]);
    },
    [searhParams],
  );

  const visiblePeople = useMemo(
    () => people.filter(filterPeopleCallback).sort(sortPeopleCallback),
    [filterPeopleCallback, people, sortPeopleCallback],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableHeaders.map(header => {
            const headerAsParam = header.toLowerCase();

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <SearchLink
                    params={handleSortOrder(header.toLowerCase(), order)}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !order || headerAsParam !== sort,
                          'fa-sort-up':
                            headerAsParam === sort && order === 'asc',
                          'fa-sort-down':
                            headerAsParam === sort && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          {unsortableHeader.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            mother,
            father,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': slug === slugParam })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>

              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
