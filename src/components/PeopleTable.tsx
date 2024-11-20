import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { SortFilter } from '../types/SortFilter';
import { Order } from '../types/OrderFilter';
import classNames from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <div className="column">
      <div className="box table-container">
        {people.length ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {Object.entries(SortFilter).map(([key, value]) => (
                  <th key={value}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {key}
                      <Link
                        to={{
                          search: getSearchWith(searchParams, {
                            sort:
                              !sort || !order || sort !== value ? value : null,
                            order: sort === value && !order ? Order.desc : null,
                          }),
                        }}
                      >
                        <span className="icon">
                          <i
                            className={classNames('fas', {
                              'fa-sort': sort !== value,
                              'fa-sort-up': !order && sort && sort === value,
                              'fa-sort-desc': order === Order.desc,
                            })}
                          />
                        </span>
                      </Link>
                    </span>
                  </th>
                ))}

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonLink
                  person={person}
                  key={person.slug}
                  activeSlug={slug}
                  search={search}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>There are no people matching the current search criteria</p>
        )}
      </div>
    </div>
  );
};
