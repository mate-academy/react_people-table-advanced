import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { TableItem } from './TableItem';
import { SearchLink } from './SearchLink';
import { SortFieldsType } from '../types/SortFieldsType';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const SortFields: SortFieldsType = {
    Name: 'name',
    Sex: 'sex',
    Born: 'born',
    Died: 'died',
  };

  function isQueryIncluded(str = '', person: Person) {
    return person.name.toLowerCase().includes(str)
      || person.fatherName?.toLowerCase().includes(str)
      || person.motherName?.toLowerCase().includes(str);
  }

  function isBornInCentury(centuries: string[] = [], person: Person) {
    return !centuries.length
      || centuries.includes(Math.ceil(person.born / 100).toString());
  }

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const preparedPeople = useMemo(() => {
    const filtredAndSortedPeople = people
      .filter(person => {
        const lowerQuery = query?.toLowerCase();

        return (sex ? person.sex === sex : person)
          && isQueryIncluded(lowerQuery, person)
          && isBornInCentury(centuries, person);
      })
      .sort((person1, person2) => {
        switch (sort) {
          case SortFields.Name:
          case SortFields.Sex:
            return person1[sort].localeCompare(person2[sort]);

          case SortFields.Born:
          case SortFields.Died:
            return person1[sort] - person2[sort];

          default:
            return 0;
        }
      });

    if (order === 'desc') {
      filtredAndSortedPeople.reverse();
    }

    return filtredAndSortedPeople;
  }, [sex, query, centuries]);

  const SortFieldsKeys = Object.keys(SortFields) as Array<keyof SortFieldsType>;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>

          {SortFieldsKeys.map(field => {
            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field}
                  <SearchLink params={{
                    sort: order === 'desc' && sort === SortFields[field]
                      ? null
                      : SortFields[field],
                    order: sort === SortFields[field] && !order ? 'desc' : null,
                  }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', 'fa-sort', {
                        'fa-sort-up': sort === SortFields[field] && !order,
                        'fa-sort-down': sort === SortFields[field] && order,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <TableItem
            key={person.name}
            person={person}
            people={preparedPeople}
          />
        ))}
      </tbody>
    </table>
  );
};