import { useEffect, useCallback, useState } from 'react';
import { PeopleItem } from './PeopleItem/PeopleItem';
import type { PeopleListType } from '../types/PeopleListType';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface PeopleTableProps extends PeopleListType {
  originalPeoplelist?: Person[];
}

export const PeopleTable = ({
  peoplelist,
  loader,
  errortext,
  onPeople,
}: PeopleTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [warning, setWarning] = useState<string>('');

  const sortName = searchParams.get('sort');
  const sortOrder = searchParams.get('order');


  const handleSortField = (fieldName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== fieldName) {
      params.set('sort', fieldName);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortBy = useCallback(
    (nameField: string, order: 'asc' | 'desc' = 'asc') => {
      const sorted = [...peoplelist].sort((a, b) => {
        const valueA = a[nameField as keyof Person];
        const valueB = b[nameField as keyof Person];

        const isNumericA = typeof valueA === 'number';
        const isNumericB = typeof valueB === 'number';

        let compareResult: number;

        if (isNumericA && isNumericB) {
          compareResult = (valueA as number) - (valueB as number);
        } else {
          const strA = String(valueA || '').toLowerCase();
          const strB = String(valueB || '').toLowerCase();

          compareResult = strA.localeCompare(strB);
        }

        return order === 'asc' ? compareResult : -compareResult;
      });

      onPeople(sorted);
    },
    [peoplelist, onPeople],
  );

  // ✅ Застосування сортування при зміні URL параметрів
  useEffect(() => {
    if (peoplelist.length === 0) {
      return;
    }

    if (sortName) {
      const order = (sortOrder as 'asc' | 'desc') || 'asc';

      sortBy(sortName, order);
    }
    // ✅ НЕ викликаємо onPeople коли сортування видалено!
    // Фільтри вже вирішили що показувати
  }, [sortName, sortOrder, sortBy]);

  const getSortIcon = (fieldName: string) => {
    if (sortName !== fieldName) {
      return 'fa-sort';
    }

    return sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <>
      {!loader &&
        (peoplelist.length > 0 ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <a
                      href="#/people"
                      onClick={e => {
                        e.preventDefault();
                        handleSortField('name');
                      }}
                    >
                      <span className="icon">
                        <i className={classNames('fas', getSortIcon('name'))} />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <a
                      href="#/people"
                      onClick={e => {
                        e.preventDefault();
                        handleSortField('sex');
                      }}
                    >
                      <span className="icon">
                        <i className={classNames('fas', getSortIcon('sex'))} />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <a
                      href="#/people"
                      onClick={e => {
                        e.preventDefault();
                        handleSortField('born');
                      }}
                    >
                      <span className="icon">
                        <i className={classNames('fas', getSortIcon('born'))} />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <a
                      href="#/people"
                      onClick={e => {
                        e.preventDefault();
                        handleSortField('died');
                      }}
                    >
                      <span className="icon">
                        <i className={classNames('fas', getSortIcon('died'))} />
                      </span>
                    </a>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {peoplelist?.map(persons => (
                <PeopleItem
                  key={persons.slug}
                  person={persons}
                  people={peoplelist}
                  warning={warning}
                  onWarning={setWarning}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <span data-cy="noPeopleMessage">{errortext}</span>
        ))}
    </>
  );
};
