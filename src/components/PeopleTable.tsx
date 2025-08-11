import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  sortedPeople: Person[];
  getPersonLink: (Person: Person) => string;
};

export const PeopleTable: React.FC<Props> = ({
  sortedPeople,
  getPersonLink,
}) => {
  const [searchParams] = useSearchParams();
  const sortName = searchParams.get('sort') || '';
  const { personName } = useParams();
  const normalizePersonName = personName || '';

  const getPersonClass = ({ sex }: Person) =>
    classNames('', { 'has-text-danger': sex === 'f' });

  const getNormalizeTableHeaderCell = (cell: string) =>
    cell.split('')[0].toUpperCase() + cell.split('').splice(1).join('');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(th => (
            <th key={th}>
              <span className="is-flex is-flex-wrap-nowrap">
                {getNormalizeTableHeaderCell(th)}
                <SearchLink
                  params={{
                    sort: th,
                    order: searchParams.get('order') === 'desc' ? null : 'desc',
                  }}
                  className="icon"
                >
                  <i
                    className={classNames('fas', {
                      'fa-sort': !searchParams.has('sort') || sortName !== th,
                      'fa-sort-up':
                        searchParams.has('sort') &&
                        !searchParams.has('order') &&
                        sortName === th,
                      'fa-sort-down':
                        searchParams.has('order') && sortName === th,
                    })}
                  />
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person: Person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames('', {
              'has-background-warning': normalizePersonName === person.slug,
            })}
          >
            <td>
              <Link to={`../${person.slug}`} className={getPersonClass(person)}>
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <Link
                  to={`../${getPersonLink(person.mother)}`}
                  className="has-text-danger"
                >
                  {person.mother.name}
                </Link>
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}
            {person.father ? (
              <td>
                <Link to={`../${getPersonLink(person.father)}`}>
                  {person.father.name}
                </Link>
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
