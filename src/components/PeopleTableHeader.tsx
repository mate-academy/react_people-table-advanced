import { FC } from 'react';

import cn from 'classnames';
const HEADER_CELLS = ['name', 'sex', 'born', 'died'];

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

const PeopleTableHeader: FC<Props> = ({ searchParams, setSearchParams }) => {
  const handleSort = (field: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const currentSort = newSearchParams.get('sort');
    const currentOrder = newSearchParams.get('order');

    if (currentSort !== field) {
      newSearchParams.set('sort', field);
      newSearchParams.delete('order');
    } else if (!currentOrder) {
      newSearchParams.set('order', 'desc');
    } else {
      newSearchParams.delete('sort');
      newSearchParams.delete('order');
    }

    setSearchParams(newSearchParams);
  };

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order') || 'asc';

  return (
    <>
      {HEADER_CELLS.map(field => (
        <th
          key={field}
          style={{ cursor: 'pointer' }}
          onClick={() => handleSort(field)}
        >
          <span className="is-flex is-align-items-center">
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <span className="icon ml-1">
              <i
                className={cn('fas', {
                  'fa-sort-up': currentSort === field && currentOrder === 'asc',
                  'fa-sort-down':
                    currentSort === field && currentOrder === 'desc',
                  'fa-sort': currentSort !== field,
                })}
              />
            </span>
          </span>
        </th>
      ))}
    </>
  );
};

export default PeopleTableHeader;
