import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  data: Person[];
};

export const PeopleTable: React.FC<Props> = ({ data }) => {
  const { personSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPersonSlug = personSlug ? personSlug : null;

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function handleSortField(sortField: string) {
    if (sortBy !== sortField) {
      const newSearchParams = getSearchWith(searchParams, {
        sort: sortField || null,
      });

      setSearchParams(newSearchParams);
    } else if (order !== 'desc') {
      const newSearchParams = getSearchWith(searchParams, {
        order: 'desc',
      });

      setSearchParams(newSearchParams);
    } else {
      const newSearchParams = getSearchWith(searchParams, {
        sort: null,
        order: null,
      });

      setSearchParams(newSearchParams);
    }
  }

  return (
    <>
      {!data.length ? (
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
                  <a onClick={() => handleSortField('name')}>
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          { 'fa-sort': sortBy !== 'name' },
                          {
                            'fa-sort-up': sortBy === 'name' && order !== 'desc',
                          },
                          {
                            'fa-sort-down':
                              sortBy === 'name' && order === 'desc',
                          },
                        )}
                      ></i>
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a onClick={() => handleSortField('sex')}>
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          { 'fa-sort': sortBy !== 'sex' },
                          {
                            'fa-sort-up': sortBy === 'sex' && order !== 'desc',
                          },
                          {
                            'fa-sort-down':
                              sortBy === 'sex' && order === 'desc',
                          },
                        )}
                      ></i>
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a onClick={() => handleSortField('born')}>
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          { 'fa-sort': sortBy !== 'born' },
                          {
                            'fa-sort-up': sortBy === 'born' && order !== 'desc',
                          },
                          {
                            'fa-sort-down':
                              sortBy === 'born' && order === 'desc',
                          },
                        )}
                      ></i>
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a onClick={() => handleSortField('died')}>
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          { 'fa-sort': sortBy !== 'died' },
                          {
                            'fa-sort-up': sortBy === 'died' && order !== 'desc',
                          },
                          {
                            'fa-sort-down':
                              sortBy === 'died' && order === 'desc',
                          },
                        )}
                      ></i>
                    </span>
                  </a>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {data.map(person => {
              const {
                slug,
                born,
                died,
                sex,
                motherName,
                mother,
                fatherName,
                father,
              } = person;

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': selectedPersonSlug === slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <PersonLink person={mother} />
                    ) : (
                      motherName || '-'
                    )}
                  </td>

                  <td>
                    {father ? (
                      <PersonLink person={father} />
                    ) : (
                      fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
