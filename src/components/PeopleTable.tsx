/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[] | null;
};

enum Sort {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sortableHeaders = [
    Sort.Name,
    Sort.Sex,
    Sort.Born,
    Sort.Died,
  ];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableHeaders.map((header) => {
            const headerToLowercase = header.toLowerCase();

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <SearchLink
                    params={{
                      sort: sort === headerToLowercase && order
                        ? null
                        : headerToLowercase,
                      order: sort === headerToLowercase && !order
                        ? 'desc'
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        {
                          'fa-sort': sort !== headerToLowercase,
                          'fa-sort-up': sort === headerToLowercase && !order,
                          'fa-sort-down': sort === headerToLowercase && order,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map((person) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            key={person.slug}
          >
            <td>
              {<PersonLink person={person} /> || '-'}
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
