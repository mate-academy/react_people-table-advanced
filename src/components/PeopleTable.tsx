import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}
/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  function getSortLink(sortBy: string) {
    let updatedSortParams;

    if (searchParams.get('sort') && searchParams.get('sort') !== sortBy) {
      updatedSortParams = { sort: sortBy, order: null };
    } else if (searchParams.has('order')) {
      updatedSortParams = { sort: null, order: null };
    } else if (searchParams.has('sort')) {
      updatedSortParams = { sort: sortBy, order: 'desc' };
    } else {
      updatedSortParams = { sort: sortBy };
    }

    return {
      search: getSearchWith(updatedSortParams, searchParams),
    };
  }

  function getSexFilterClass(val: string) {
    let sortClass = 'fa-sort';

    if (searchParams.get('sort') === val) {
      if (searchParams.has('order')) {
        sortClass = 'fa-sort-down';
      } else if (searchParams.has('sort')) {
        sortClass = 'fa-sort-up';
      }
    }

    return sortClass;
  }

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
              <Link to={getSortLink('name')}>
                <span className="icon">
                  <i className={`fas ${getSexFilterClass('name')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')}>
                <span className="icon">
                  <i className={`fas ${getSexFilterClass('sex')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')}>
                <span className="icon">
                  <i className={`fas ${getSexFilterClass('born')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')}>
                <span className="icon">
                  <i className={`fas ${getSexFilterClass('died')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
