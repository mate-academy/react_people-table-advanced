import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../../../types/Person';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findParent = useCallback((personName: string | null) => {
    const parent = people.find(person => person.name === personName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return personName || '-';
  }, [people]);

  useEffect(() => {
    let filteredAndSortedPeople = [...people];

    if (sex) {
      filteredAndSortedPeople = filteredAndSortedPeople.filter(
        person => person.sex === sex,
      );
    }

    if (query) {
      filteredAndSortedPeople = filteredAndSortedPeople.filter(person => {
        const lowerQuery = query.toLowerCase();
        const personNames = person.name
              + person.fatherName + person.motherName;

        return personNames.toLowerCase().includes(lowerQuery);
      });
    }

    if (centuries.length) {
      filteredAndSortedPeople = filteredAndSortedPeople.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      });
    }

    if (sortBy) {
      filteredAndSortedPeople = filteredAndSortedPeople.sort(
        (prev, current) => {
          switch (sortBy) {
            case 'sex':
            case 'name':
              return prev[sortBy].localeCompare(current[sortBy]);
            case 'born':
            case 'died':
              return prev[sortBy] - current[sortBy];
            default:
              return 0;
          }
        },
      );
    }

    if (order) {
      filteredAndSortedPeople.reverse();
    }

    setFilteredPeople(filteredAndSortedPeople);
  }, [searchParams]);

  const noSortParams = !sortBy || !order;
  const noSortOrder = sortBy && !order;

  return (
    <table
      data-cy="peopleTable"
      className={'table is-striped is-hoverable'
        + 'is-narrow is-fullwidth'}
    >
      {filteredPeople.length
        ? (
          <>
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink
                      params={{
                        sort: noSortParams ? 'name' : null,
                        order: noSortOrder ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          { 'fa-sort': sortBy !== 'name' },
                          { 'fa-sort-down': sortBy === 'name' && !order },
                          { 'fa-sort-up': sortBy === 'name' && order },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={{
                        sort: noSortParams ? 'sex' : null,
                        order: noSortOrder ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          { 'fa-sort': sortBy !== 'sex' },
                          { 'fa-sort-down': sortBy === 'sex' && !order },
                          { 'fa-sort-up': sortBy === 'sex' && order },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={{
                        sort: noSortParams ? 'born' : null,
                        order: noSortOrder ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          { 'fa-sort': sortBy !== 'born' },
                          { 'fa-sort-down': sortBy === 'born' && !order },
                          { 'fa-sort-up': sortBy === 'born' && order },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={{
                        sort: !sortBy || !order ? 'died' : null,
                        order: sortBy && !order ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          { 'fa-sort': sortBy !== 'died' },
                          { 'fa-sort-down': sortBy === 'died' && !order },
                          { 'fa-sort-up': sortBy === 'died' && order },
                        )}
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
              {filteredPeople.map(person => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': personSlug === person.slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{findParent(person.motherName)}</td>
                  <td>{findParent(person.fatherName)}</td>
                </tr>
              ))}
            </tbody>
          </>
        )
        : <p>There are no people matching the current search criteria</p>}
    </table>
  );
};
