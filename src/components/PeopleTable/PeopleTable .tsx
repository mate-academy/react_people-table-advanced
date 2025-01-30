import { useState } from 'react';
import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';
import { SortKey, SortState } from '../../types/Sort';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const [sortState, setSortState] = useState<SortState>({
    name: null,
    sex: null,
    born: null,
    died: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const toggleSort = (event: React.MouseEvent, key: SortKey) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (!currentSort) {
      params.set('sort', key);
    } else if (currentSort === key && !currentOrder) {
      params.set('order', 'desc');
    } else if (currentSort === key && currentOrder) {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', key);
      params.delete('order');
    }

    setSearchParams(params);
  };

  // const toggleSort = (key: SortKey) => {
  //   setSortState(currentSortState => {
  //     const newSortState = { ...currentSortState };

  //     Object.keys(newSortState).forEach(k => {
  //       if (k !== key) {
  //         newSortState[k as SortKey] = null;
  //       }
  //     });

  //     switch (newSortState[key]) {
  //       case null: {
  //         newSortState[key] = 'asc';
  //         break;
  //       }

  //       case 'asc': {
  //         newSortState[key] = 'desc';
  //         break;
  //       }

  //       default:
  //         newSortState[key] = null;
  //         break;
  //     }

  //     return newSortState;
  //   });
  // };

  const getSortIconClass = (key: SortKey) => {
    return classNames('fas', {
      'fa-sort-up': sortState[key] === 'asc',
      'fa-sort-down': sortState[key] === 'desc',
      'fa-sort': sortState[key] === null,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table
    is-striped
    is-hoverable
    is-narrow
    is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <NavLink to={`#`}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortKey.name)}
                    onClick={event => toggleSort(event, SortKey.name)}
                  />
                </span>
              </NavLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink to={`#`}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortKey.sex)}
                    onClick={event => toggleSort(event, SortKey.sex)}
                  />
                </span>
              </NavLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink to={`#`}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortKey.born)}
                    onClick={event => toggleSort(event, SortKey.born)}
                  />
                </span>
              </NavLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink to={`#`}>
                <span className="icon">
                  <i
                    className={getSortIconClass(SortKey.died)}
                    onClick={event => toggleSort(event, SortKey.died)}
                  />
                </span>
              </NavLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          return <PeopleLink key={person.slug} {...person} />;
        })}
      </tbody>
    </table>
  );
};
