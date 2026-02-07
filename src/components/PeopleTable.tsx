import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSortParams = (field: string) => {
    const isActive = currentSort === field;
    const isDesc = currentOrder === 'desc';

    if (!isActive) {
      return { sort: field, order: null };
    }

    if (!isDesc) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderIcon = (field: string) => {
    if (currentSort !== field) {
      return <i className="fas fa-sort has-text-grey-light" />;
    }

    if (currentOrder === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SearchLink params={getSortParams('name')}>
              <span className="icon-text is-flex-wrap-nowrap">
                <span className="icon">{renderIcon('name')}</span>
                <span>Name</span>
              </span>
            </SearchLink>
          </th>

          <th>
            <SearchLink params={getSortParams('sex')}>
              <span className="icon-text is-flex-wrap-nowrap">
                <span className="icon">{renderIcon('sex')}</span>
                <span>Sex</span>
              </span>
            </SearchLink>
          </th>

          <th>
            <SearchLink params={getSortParams('born')}>
              <span className="icon-text is-flex-wrap-nowrap">
                <span className="icon">{renderIcon('born')}</span>
                <span>Born</span>
              </span>
            </SearchLink>
          </th>

          <th>
            <SearchLink params={getSortParams('died')}>
              <span className="icon-text is-flex-wrap-nowrap">
                <span className="icon">{renderIcon('died')}</span>
                <span>Died</span>
              </span>
            </SearchLink>
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
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
