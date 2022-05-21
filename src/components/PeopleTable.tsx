import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import debounce from 'lodash/debounce';
import { PersonRow } from './PersonRow';

type Props = {
  arrayOfPeople: Child[],
};

const arrayOfHeaders = [
  { key: 'Name', label: 'Name' },
  { key: 'Sex', label: 'Sex' },
  { key: 'Born', label: 'Born' },
  { key: 'Died', label: 'Died' },
  { key: 'Mother', label: 'Mother' },
  { key: 'Father', label: 'Father' },
];

export const PeopleTable: React.FC<Props> = React.memo(({ arrayOfPeople }) => {
  const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const sortTable = (
    arr: Child[],
    sort: string | null,
    order: string | null,
  ) => {
    const copy = [...arr];

    switch (sort) {
      case 'name':
      case 'sex':
        return (order === 'asc')
          ? copy
            .sort((a, b) => a[sort].localeCompare(b[sort]))
          : copy
            .sort((a, b) => b[sort].localeCompare(a[sort]));
      case 'born':
        return (order === 'asc')
          ? copy.sort((a, b) => a.born - b.born)
          : copy.sort((a, b) => b.born - a.born);

      case 'died':
        return (order === 'asc')
          ? copy.sort((a, b) => a.died - b.died)
          : copy.sort((a, b) => b.died - a.died);

      default:
        return copy;
    }
  };

  const sortedTable = useCallback(
    () => sortTable(arrayOfPeople, sortBy, sortingOrder),
    [arrayOfPeople, sortBy, sortingOrder],
  );

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.innerText.toLowerCase();

    navigate(`people?sortBy=${target}&sortOrder=${sortingOrder}`);
    setSortingOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <table
      className="PeopleTable"
      style={{
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        <tr>
          {arrayOfHeaders.map(header => (
            <th key={header.key}>
              <button
                type="button"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={
                  (header.label !== 'Mother' && header.label !== 'Father')
                    ? onClickHandler
                    : undefined
                }
              >
                {header.label}
              </button>
              {sortBy === header.label.toLowerCase()
                ? '*' : ''}
              {sortOrder === 'asc'
                ? (
                  <img
                    src="/images/sort_asc.png"
                    alt="ascending arrow"
                  />
                )
                : (
                  <img
                    src="/images/sort_desc.png"
                    alt="descending arrow"
                  />
                )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedTable().map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
});
