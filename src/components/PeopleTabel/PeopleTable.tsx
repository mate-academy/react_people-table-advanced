import { PersonRow } from './PersonRow';
import { Person } from '../../types/Person';
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

const getSortClass = (currentSort: string, sort: string, order: string) => {
  if (sort === currentSort) {
    return classNames('fas', {
      'fa-sort-up': order === 'asc',
      'fa-sort-down': order === 'desc',
      'fa-sort': !order,
    });
  } else {
    return classNames('fas', 'fa-sort');
  }
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  const handleSort = (
    currentSort: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const previousSort = searchParams.get('sort') || '';

    if (previousSort === currentSort) {
      const previousOrder = searchParams.get('order') || '';

      switch (previousOrder) {
        case '':
          searchParams.set('sort', previousSort);
          searchParams.set('order', 'asc');
          break;
        case 'asc':
          searchParams.set('sort', previousSort);
          searchParams.set('order', 'desc');
          break;
        case 'desc':
          searchParams.delete('sort');
          searchParams.delete('order');
          break;
      }
    } else {
      searchParams.set('sort', currentSort);
      searchParams.set('order', 'asc');
    }

    setSearchParams(searchParams);
  };

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
              <Link
                to="#/people?sort=name"
                onClick={event => handleSort('name', event)}
              >
                <span className="icon">
                  <i className={getSortClass(sort, 'name', order)} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to="#/people?sort=sex"
                onClick={event => handleSort('sex', event)}
              >
                <span className="icon">
                  <i className={getSortClass(sort, 'sex', order)} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to="#/people?sort=born&amp;order=desc"
                onClick={event => handleSort('born', event)}
              >
                <span className="icon">
                  <i className={getSortClass(sort, 'born', order)} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to="#/people?sort=died"
                onClick={event => handleSort('died', event)}
              >
                <span className="icon">
                  <i className={getSortClass(sort, 'died', order)} />
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
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
