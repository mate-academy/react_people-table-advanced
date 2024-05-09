/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
import PersonLink from '../PersonLink/PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  sortByParams: string;
  orderByParams: string;
};

const PeopleTable: React.FC<Props> = ({
  people,
  sortByParams,
  orderByParams,
}) => {
  const [searchParams] = useSearchParams();

  const getSortIconClass = (paramName: string) => {
    return classNames(
      'fas',
      {
        'fa-sort': sortByParams !== paramName,
      },
      {
        'fa-sort-up': sortByParams === paramName && !orderByParams,
      },
      {
        'fa-sort-down': orderByParams && sortByParams === paramName,
      },
    );
  };

  return (
    <>
      {people.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
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
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: sortByParams && orderByParams ? null : 'name',
                        order: sortByParams && !orderByParams ? 'desk' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i className={getSortIconClass('name')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: sortByParams && orderByParams ? null : 'sex',
                        order: sortByParams && !orderByParams ? 'desk' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i className={getSortIconClass('sex')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: sortByParams && orderByParams ? null : 'born',
                        order: sortByParams && !orderByParams ? 'desk' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i className={getSortIconClass('born')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: sortByParams && orderByParams ? null : 'died',
                        order: sortByParams && !orderByParams ? 'desk' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i className={getSortIconClass('died')} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <PersonLink
                  key={person.slug}
                  person={person}
                  mother={mother}
                  father={father}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PeopleTable;
