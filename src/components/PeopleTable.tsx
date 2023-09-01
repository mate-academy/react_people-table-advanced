import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { SortType } from '../enums/SortType';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const { slug } = useParams();
  const selectedPerson = slug || '';

  const handleSorting = (sortBy: SortType) => {
    if (!sort || sort !== sortBy) {
      return getSearchWith(searchParams, { sort: sortBy });
    }

    if (sortBy === sort && !order) {
      return getSearchWith(searchParams, { sort: sortBy, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getArrowClass = (sortBy: SortType) => classNames('fas', {
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
              <Link to={{ search: handleSorting(SortType.Name) }}>
                <span className="icon">
                  <i className={getArrowClass(SortType.Name)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSorting(SortType.Sex) }}>
                <span className="icon">
                  <i className={getArrowClass(SortType.Sex)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSorting(SortType.Born) }}>
                <span className="icon">
                  <i className={getArrowClass(SortType.Born)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSorting(SortType.Died) }}>
                <span className="icon">
                  <i className={getArrowClass(SortType.Died)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Father
              <Link to={{ search: handleSorting(SortType.Father) }}>
                <span className="icon">
                  <i className={getArrowClass(SortType.Father)} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
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
