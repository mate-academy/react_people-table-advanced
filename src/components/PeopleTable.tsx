import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const { slug } = useParams();
  const selectedPerson = slug || '';

  const handleSorting = (sortBy: string) => {
    if (!sort || sort !== sortBy) {
      return getSearchWith(searchParams, { sort: sortBy });
    }

    if (sortBy === sort && !order) {
      return getSearchWith(searchParams, { sort: sortBy, order: 'desc' });
    }
    
    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getArrowClass = (sortBy: string) => classNames('fas', {
    'fa-sort': !sort || sort !== sortBy,
    'fa-sort-up': sort === sortBy && !order,
    'fa-sort-down': sort === sortBy && order,
  });

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
              <Link to={{ search: handleSorting('name') }}>
                <span className="icon">
                  <i className={getArrowClass('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSorting('sex') }}>
                <span className="icon">
                  <i className={getArrowClass('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSorting('born') }}>
                <span className="icon">
                  <i className={getArrowClass('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSorting('died') }}>
                <span className="icon">
                  <i className={getArrowClass('died')} />
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
          <PersonLink
            person={person}
            selectedPerson={selectedPerson}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};