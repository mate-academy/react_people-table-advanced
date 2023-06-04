import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  slug: string | undefined,
  sort: string,
  order: string,
};

const sortByOptions = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: FC<Props> = ({
  people, slug, sort, order,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortByOptions.map(option => {
            const lowercasedOption = option.toLowerCase();

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  <SearchLink
                    params={{
                      sort: sort === lowercasedOption && order
                        ? null
                        : lowercasedOption,
                      order: sort === lowercasedOption && !order
                        ? 'desc'
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sort !== lowercasedOption,
                        'fa-sort-up': sort === lowercasedOption && !order,
                        'fa-sort-down': sort === lowercasedOption && order,
                      })}
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
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
