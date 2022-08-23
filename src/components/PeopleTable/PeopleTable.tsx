import { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = useMemo(() => searchParams.get('sort'), [searchParams]);
  const order = useMemo(() => searchParams.get('order'), [searchParams]);

  const visiblePeople = useMemo(() => (
    [...people].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return order
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        case 'sex':
          return order
            ? b.sex.localeCompare(a.sex)
            : a.sex.localeCompare(b.sex);
        case 'born':
          return order ? b.born - a.born : a.born - b.born;
        case 'died':
          return order ? b.died - a.died : a.died - b.died;
        default:
          return 0;
      }
    })
  ), [people, sortBy, order]);

  const findParent = useCallback((name: string | null) => (
    name ? visiblePeople.find(person => person.name === name) : null
  ), [visiblePeople]);

  const headers = useMemo(() => (
    Object.keys(people[0]).slice(0, -3)
  ), [people]);

  const peopleWithParents = useMemo<Person[]>(() => (
    visiblePeople.map(person => ({
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    }))
  ), [visiblePeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                {sortBy !== header && (
                  <SearchLink params={{ sort: header }}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                )}
                {sortBy === header && !order && (
                  <SearchLink params={{ order: 'desc' }}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </SearchLink>
                )}
                {sortBy === header && order && (
                  <SearchLink params={{ order: null, sort: null }}>
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParents.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink
                    person={person.mother}
                  />
                ) : person.motherName}
              </td>
              <td>
                {person.father ? (
                  <PersonLink
                    person={person.father}
                  />
                ) : person.fatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
