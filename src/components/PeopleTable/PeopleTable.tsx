import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const peopleByName = new Map<string, Person>(
    people.map(person => [person.name, person]),
  );

  const renderSortHeader = (title: string, field: string) => {
    const isSortedByField = currentSort === field;
    const isDesc = isSortedByField && currentOrder === 'desc';

    const nextParams =
      currentSort !== field
        ? { sort: field, order: null }
        : !isDesc
          ? { sort: field, order: 'desc' }
          : { sort: null, order: null };

    return (
      <th>
        <SearchLink params={nextParams}>
          <span className="is-flex is-flex-wrap-nowrap">
            {title}
            <span className="icon">
              <i
                className={classNames('fas', {
                  'fa-sort': !isSortedByField,
                  'fa-sort-up': isSortedByField && !isDesc,
                  'fa-sort-down': isSortedByField && isDesc,
                })}
              />
            </span>
          </span>
        </SearchLink>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeader('Name', 'name')}
          {renderSortHeader('Sex', 'sex')}
          {renderSortHeader('Born', 'born')}
          {renderSortHeader('Died', 'died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName.get(person.motherName)
            : null;

          const father = person.fatherName
            ? peopleByName.get(person.fatherName)
            : null;

          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected,
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
