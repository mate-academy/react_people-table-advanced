/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const { personName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const peopleByName: Record<string, Person> = {};

  people.forEach(person => {
    peopleByName[person.name] = person;
  });

  const visiblePeople = people
    .filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        (p.motherName || '').toLowerCase().includes(query) ||
        (p.fatherName || '').toLowerCase().includes(query),
    )
    .filter(
      p =>
        !centuries.length ||
        centuries.includes(String(Math.ceil(p.born / 100))),
    )
    .filter(p => sex === null || p.sex === sex);

  const sortedPeople = [...visiblePeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      let comparison = 0;

      if (sort === 'name' || sort === 'sex') {
        comparison = a[sort].localeCompare(b[sort]);
      } else if (sort === 'born' || sort === 'died') {
        comparison = a[sort] - b[sort];
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }

  function setSort(e: React.MouseEvent<HTMLAnchorElement>, name: string) {
    e.preventDefault();
    if (sort === name && order === 'desc') {
      setSearchParams(prev => {
        prev.delete('sort');
        prev.delete('order');

        return prev;
      });
    } else if (sort === name) {
      setSearchParams({
        sort,
        order: 'desc',
      });
    } else {
      setSearchParams({ sort: name });
    }
  }

  return (
    <>
      {visiblePeople.length === 0 && (
        <p>There are no people matching the current search criteria</p>
      )}
      {visiblePeople.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink
                    params={{ sort: 'name' }}
                    onClick={e => setSort(e, 'name')}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'name',
                          'fa-sort-up': sort === 'name' && order !== 'desc',
                          'fa-sort-down': sort === 'name' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={{ sort: 'sex' }}
                    onClick={e => setSort(e, 'sex')}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'sex',
                          'fa-sort-up': sort === 'sex' && order !== 'desc',
                          'fa-sort-down': sort === 'sex' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={{ sort: 'born' }}
                    onClick={e => setSort(e, 'born')}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'born',
                          'fa-sort-up': sort === 'born' && order !== 'desc',
                          'fa-sort-down': sort === 'born' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={{ sort: 'died' }}
                    onClick={e => setSort(e, 'died')}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'died',
                          'fa-sort-up': sort === 'died' && order !== 'desc',
                          'fa-sort-down': sort === 'died' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(p => {
              const motherPerson = peopleByName[p.motherName ?? ''];
              const fatherPerson = peopleByName[p.fatherName ?? ''];

              return (
                <tr
                  data-cy="person"
                  key={p.name}
                  className={classNames({
                    'has-background-warning': p.slug === personName,
                  })}
                >
                  <td>
                    <PersonLink person={p} />
                  </td>

                  <td>{p.sex}</td>
                  <td>{p.born}</td>
                  <td>{p.died}</td>
                  <td>
                    {motherPerson ? (
                      <PersonLink person={motherPerson} />
                    ) : (
                      p.motherName || '-'
                    )}
                  </td>
                  <td>
                    {fatherPerson ? (
                      <PersonLink person={fatherPerson} />
                    ) : (
                      p.fatherName || '-'
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
