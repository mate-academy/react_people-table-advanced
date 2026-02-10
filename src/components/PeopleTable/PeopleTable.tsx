/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  people: Person[];
};

type StringSortKey = 'name' | 'sex';
type NumberSortKey = 'born' | 'died';
type SortKey = StringSortKey | NumberSortKey;

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedPerson } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') as SortKey | null;
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim();
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = useMemo(() => {
    let normalizedPeople = [...people];

    switch (sort) {
      case 'name':
      case 'sex':
        normalizedPeople.sort((a, b) =>
          a[sort].localeCompare(b[sort]),
        );
        break;

      case 'born':
      case 'died':
        normalizedPeople.sort((a, b) =>
          a[sort] - b[sort],
        );
        break;

      default:
        break;
    }

    if (order === 'desc') {
      normalizedPeople.reverse();
    }

    if (sex) {
      normalizedPeople = normalizedPeople.filter(
        person => person.sex === sex,
      );
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      normalizedPeople = normalizedPeople.filter(person => {
        const name = person.name.toLowerCase();
        const mother = person.motherName?.toLowerCase() || '';
        const father = person.fatherName?.toLowerCase() || '';

        return (
          name.includes(normalizedQuery)
          || mother.includes(normalizedQuery)
          || father.includes(normalizedQuery)
        );
      });
    }

    if (centuries.length) {
      normalizedPeople = normalizedPeople.filter(person => {
        const personCentury = Math.ceil(person.born / 100);
        return centuries.includes(String(personCentury));
      });
    }

    return normalizedPeople;
  }, [people, searchParams]);

  const getSortParams = (column: SortKey): SearchParams => {
    const isCurrentColumn = sort === column;
    const isDesc = order === 'desc';

    let nextParams: SearchParams;

    if (!isCurrentColumn) {
      nextParams = { sort: column, order: null };
    } else if (!isDesc) {
      nextParams = { sort: column, order: 'desc' };
    } else {
      nextParams = { sort: null, order: null };
    }

    return nextParams;
  };

  const getSortClassNames = (column: SortKey) => {
    const isCurrentColumn = sort === column;
    const isDesc = order === 'desc';

    return classNames('fas', {
      'fa-sort': !isCurrentColumn,
      'fa-sort-up': isCurrentColumn && !isDesc,
      'fa-sort-down': isCurrentColumn && isDesc,
    });
  };

  return (
    <>
      {visiblePeople.length > 0 ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={getSortParams('name')}>
                    <span className="icon">
                      <i className={getSortClassNames('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={getSortParams('sex')}>
                    <span className="icon">
                      <i className={getSortClassNames('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={getSortParams('born')}>
                    <span className="icon">
                      <i className={getSortClassNames('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={getSortParams('died')}>
                    <span className="icon">
                      <i className={getSortClassNames('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => {
              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': person.slug === selectedPerson,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {!person.motherName
                      ? '-'
                      : mother
                        ? <PersonLink person={mother} />
                        : person.motherName}
                  </td>
                  <td>
                    {!person.fatherName
                      ? '-'
                      : father
                        ? <PersonLink person={father} />
                        : person.fatherName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
