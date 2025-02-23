import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  peopleList: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [searchParams] = useSearchParams();

  const sortName = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const sortParams = ['name', 'sex', 'born', 'died'];

  return (
    <>
      {/* <p>{searchParams.toString()}</p> */}
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sortParams.map(param => (
              <th key={param}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {param[0].toUpperCase() + param.slice(1)}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort:
                          sortName === param && sortOrder === 'desc'
                            ? null
                            : param,
                        order: sortName === param && !sortOrder ? 'desc' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`fas fa-sort${sortName === param ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
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
          {peopleList?.map(person => (
            <PersonLink key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
