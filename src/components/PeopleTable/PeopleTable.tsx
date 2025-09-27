import { Person } from '../../types';
import { PersonItem } from '../Person/Person';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSortChange = (
    field: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (order && sort) {
      params.delete('sort');
      params.delete('order');
    }

    if (sort === field) {
      if (order) {
        params.delete('order');
      } else {
        params.set('order', 'desc');
      }
    } else {
      params.set('sort', field);
    }

    setSearchParams(params);
  };

  return (
    <>
      <div>
        {pathname}
        {search}
      </div>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <Link
                  to="#"
                  onClick={e => {
                    handleSortChange('name', e);
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-down': sort === 'name' && order === 'desc',
                        'fa-sort-up': sort === 'name' && !order,
                        'fa-sort': sort !== 'name',
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <Link to="#" onClick={e => handleSortChange('sex', e)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-down': sort === 'sex' && order === 'desc',
                        'fa-sort-up': sort === 'sex' && !order,
                        'fa-sort': sort !== 'sex',
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <Link to="#" onClick={e => handleSortChange('born', e)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-down': sort === 'born' && order === 'desc',
                        'fa-sort-up': sort === 'born' && !order,
                        'fa-sort': sort !== 'born',
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <Link to="#" onClick={e => handleSortChange('died', e)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-down': sort === 'died' && order === 'desc',
                        'fa-sort-up': sort === 'died' && !order,
                        'fa-sort': sort !== 'died',
                      })}
                    />
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
            <PersonItem key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
