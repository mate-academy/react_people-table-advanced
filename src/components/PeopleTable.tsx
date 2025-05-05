import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SortName, SortOrder } from '../types/SortTypes';

type Props = {
  people: Person[];
  sortedPeople?: (
    sortName: SortName | null,
    sortOrder: SortOrder | null,
  ) => void;
};

const sortNames = [
  { value: 'Name', name: 'name', link: true },
  { value: 'Sex', name: 'sex', link: true },
  { value: 'Born', name: 'born', link: true },
  { value: 'Died', name: 'died', link: true },
  { value: 'Mother', name: 'mother', link: false },
  { value: 'Father', name: 'father', link: false },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortName, setSortName] = useState<SortName | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);

  const handleSort = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const sortEventName = event.currentTarget.dataset.sort;

    if (sortEventName !== sortName) {
      setSortName(sortEventName as SortName);
    }

    if (sortEventName === sortName && sortOrder === null) {
      setSortOrder('desc');
    }

    if (sortEventName === sortName && sortOrder === 'desc') {
      setSortOrder(null);
      setSortName(null);
    }

    return;
  };

  useEffect(() => {
    setSearchParams(
      getSearchWith(searchParams, {
        order: sortOrder,
        sort: sortName,
      }),
    );
  }, [sortName, sortOrder]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortNames.map(({ value, name, link }) =>
            link ? (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: name,
                        order: sortOrder,
                      }),
                    }}
                    data-sort={name}
                    onClick={handleSort}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sortName !== name,
                          'fa-sort-up':
                            sortName === name && sortOrder !== 'desc',
                          'fa-sort-down':
                            sortOrder === 'desc' && sortName === name,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            ) : (
              <th key={name}>{value}</th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
