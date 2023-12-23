/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useCallback, useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { FilterParams } from '../types/FilterParams';
import { getSearchWith } from '../utils/searchHelper';
import { SortParams } from '../types/SortParams';
import { SortType } from '../types/SortType';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    let result = [...people];
    const sexSearchValue = searchParams.get(FilterParams.Sex);
    const querySearchValue = searchParams.get(FilterParams.Query);
    const centurySearchValue = searchParams.getAll(FilterParams.Century);
    const sortNameParams = searchParams.get(SortParams.Sort);
    const orderParams = searchParams.get(SortParams.Order);

    if (sexSearchValue) {
      result = result.filter(p => p.sex === sexSearchValue);
    }

    if (querySearchValue) {
      result = result.filter(p => {
        return (
          p.name.includes(querySearchValue)
        || p.motherName?.includes(querySearchValue)
        || p.fatherName?.includes(querySearchValue)
        );
      });
    }

    if (centurySearchValue.length) {
      let peopleFromCenturies: Person[] = [];

      centurySearchValue.forEach(century => {
        const peopleFromCurrCentury = [...result].filter(p => (
          Math.ceil(p.born / 100) === +century
        ));

        peopleFromCenturies = [
          ...peopleFromCenturies,
          ...peopleFromCurrCentury,
        ];
      });

      result = peopleFromCenturies;
    }

    if (!sortNameParams) {
      return result;
    }

    switch (sortNameParams) {
      case SortType.Name:
        result.sort(
          (person1, person2) => person1.name.localeCompare(person2.name),
        );
        break;

      case SortType.Sex:
        result.sort(
          (person1, person2) => person1.sex.localeCompare(person2.sex),
        );
        break;
      case SortType.Born:
        result.sort(
          (person1, person2) => person1.born - person2.born,
        );
        break;
      case SortType.Died:
        result.sort(
          (person1, person2) => person1.died - person2.died,
        );
        break;

      default:
        break;
    }

    if (orderParams) {
      result.reverse();
    }

    return result;
  }, [searchParams, people]);

  const handleSort = useCallback((type: SortType): string => {
    const sortNameParams = searchParams.get(SortParams.Sort);
    const orderParams = searchParams.get(SortParams.Order);

    switch (true) {
      case sortNameParams === type && !orderParams:
        return getSearchWith(
          searchParams, { [SortParams.Order]: 'desc' },
        );

      case sortNameParams !== type:
        return getSearchWith(
          searchParams, {
            [SortParams.Sort]: type,
            [SortParams.Order]: null,
          },
        );

      case (sortNameParams === type && !!orderParams):
        return getSearchWith(
          searchParams, {
            [SortParams.Sort]: null,
            [SortParams.Order]: null,
          },
        );

      default:
        return '';
    }
  }, [searchParams]);

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
              <Link
                to={{
                  search: handleSort(SortType.Name),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort':
                        searchParams.get(SortParams.Sort) !== SortType.Name,
                      'fa-sort-up':
                        searchParams.get(SortParams.Sort) === SortType.Name
                        && !searchParams.has(SortParams.Order),
                      'fa-sort-down':
                        searchParams.get(SortParams.Sort) === SortType.Name
                        && searchParams.has(SortParams.Order),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: handleSort(SortType.Sex),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort':
                        searchParams.get(SortParams.Sort) !== SortType.Sex,
                      'fa-sort-up':
                        searchParams.get(SortParams.Sort) === SortType.Sex
                        && !searchParams.has(SortParams.Order),
                      'fa-sort-down':
                        searchParams.get(SortParams.Sort) === SortType.Sex
                        && searchParams.has(SortParams.Order),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: handleSort(SortType.Born),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort':
                        searchParams.get(SortParams.Sort) !== SortType.Born,
                      'fa-sort-up':
                        searchParams.get(SortParams.Sort) === SortType.Born
                        && !searchParams.has(SortParams.Order),
                      'fa-sort-down':
                        searchParams.get(SortParams.Sort) === SortType.Born
                        && searchParams.has(SortParams.Order),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: handleSort(SortType.Died),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort':
                       searchParams.get(SortParams.Sort) !== SortType.Born,
                      'fa-sort-up':
                        searchParams.get(SortParams.Sort) === SortType.Died
                        && !searchParams.has(SortParams.Order),
                      'fa-sort-down':
                        searchParams.get(SortParams.Sort) === SortType.Died
                        && searchParams.has(SortParams.Order),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          visiblePeople.map(person => {
            const {
              born,
              died,
              fatherName,
              motherName,
              name,
              sex,
              father,
              mother,
              slug: personSlug,
            } = person;

            return (
              <tr
                data-cy="person"
                className={cn(
                  { 'has-background-warning': slug === personSlug },
                )}
                key={name}
              >
                <td>
                  <PersonLink person={person}>
                    {name}
                  </PersonLink>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  <PersonLink person={mother}>
                    {motherName ?? '-'}
                  </PersonLink>
                </td>
                <td>
                  <PersonLink person={father}>
                    {fatherName ?? '-'}
                  </PersonLink>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
