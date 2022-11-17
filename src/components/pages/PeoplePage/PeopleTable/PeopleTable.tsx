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
    const filteredAndSortedPeople = people.filter(person => {
      if (sex) {
        return person.sex === sex;
      }

      return person;
    }).filter(person => {
      if (query) {
        const lowerQuery = query.toLowerCase();
        const personNames = person.name
              + person.fatherName + person.motherName;

        return personNames.toLowerCase().includes(lowerQuery);
      }

      return person;
    }).filter(person => {
      if (centuries.length) {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      }

      return person;
    }).sort((prev, current) => {
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
    });

    if (order) {
      filteredAndSortedPeople.reverse();
    }

    setFilteredPeople(filteredAndSortedPeople);
  }, [searchParams]);

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
                        sort: !sortBy || !order ? 'name' : null,
                        order: sortBy && !order ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        {sortBy !== 'name' && <i className="fas fa-sort" />}
                        {sortBy === 'name'
                          && !order && <i className="fas fa-sort-down" />}
                        {sortBy === 'name'
                          && order && <i className="fas fa-sort-up" />}
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={{
                        sort: !sortBy || !order ? 'sex' : null,
                        order: sortBy && !order ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        {sortBy !== 'sex' && <i className="fas fa-sort" />}
                        {sortBy === 'sex'
                          && !order && <i className="fas fa-sort-down" />}
                        {sortBy === 'sex'
                          && order && <i className="fas fa-sort-up" />}
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={{
                        sort: !sortBy || !order ? 'born' : null,
                        order: sortBy && !order ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        {sortBy !== 'born' && <i className="fas fa-sort" />}
                        {sortBy === 'born'
                          && !order && <i className="fas fa-sort-down" />}
                        {sortBy === 'born'
                          && order && <i className="fas fa-sort-up" />}
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
                        {sortBy !== 'died' && <i className="fas fa-sort" />}
                        {sortBy === 'died'
                          && !order && <i className="fas fa-sort-down" />}
                        {sortBy === 'died'
                          && order && <i className="fas fa-sort-up" />}
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
