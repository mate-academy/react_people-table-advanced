import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { usePeopleState } from '../store/PeopleContext';

import { Loader } from './Loader';
import { People } from './People';

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

    if (!sort && sort !== sortColumn) {
      newSearchParams.set('sort', sortColumn);
    } else if (sort === sortColumn && order !== 'desc') {
      newSearchParams.set('order', 'desc');
    } else {
      newSearchParams.delete('order');
      newSearchParams.delete('sort');
    }

    setSearchParams(newSearchParams);
  };

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
                    {Column[column].charAt(0).toUpperCase() +
                      Column[column].slice(1)}
                    <a href="" onClick={e => handleLinkOnClick(e, column)}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': sort !== column,
                            'fa-sort-up': sort === column && order !== 'desc',
                            'fa-sort-down': sort === column && order,
                          })}
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
            <People />
          </tbody>
        </table>
      )}
    </>
  );
};
