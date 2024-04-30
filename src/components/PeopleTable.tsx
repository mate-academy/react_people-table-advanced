import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { usePeopleState } from '../store/PeopleContext';

import { Loader } from './Loader';
import { TableRowPeople } from './TableRowPeople';

enum Column {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}
const sortColumns = Object.values(Column);

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { loading } = usePeopleState();

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleLinkOnClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sortColumn: string,
  ) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);

    if (sort === sortColumn) {
      if (order === 'desc') {
        newSearchParams.delete('order');
        newSearchParams.delete('sort');
      } else {
        newSearchParams.set('order', 'desc');
      }
    } else {
      newSearchParams.set('sort', sortColumn);
    }

    setSearchParams(newSearchParams);
  };

  const formatAsCapitalized = (column: string) => {
    return column.charAt(0).toUpperCase() + column.slice(1);
  };

  const getSortIconClasses = (columnName: string) => {
    return cn('fas', {
      'fa-sort': sort !== columnName,
      'fa-sort-up': sort === columnName && order !== 'desc',
      'fa-sort-down': sort === columnName && order === 'desc'
    });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sortColumns.map(column => (
                <th key={column}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {formatAsCapitalized(column)}
                    <a href="" onClick={e => handleLinkOnClick(e, column)}>
                      <span className="icon">
                        <i
                          className={getSortIconClasses(column)}
                        />
                      </span>
                    </a>
                  </span>
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            <TableRowPeople />
          </tbody>
        </table>
      )}
    </>
  );
};
