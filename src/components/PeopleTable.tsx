import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const peopleByName = new Map<string, Person>();

  people.forEach(person => {
    peopleByName.set(person.name, person);
  });

  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortIcon = (field: SortField) => {
    const isSorted = sort === field;

    return (
      <SearchLink params={getSortParams(field)}>
        <span className="icon">
          <i
            className={classNames('fas', {
              'fa-sort': !isSorted,
              'fa-sort-up': isSorted && !order,
              'fa-sort-down': isSorted && order === 'desc',
            })}
          />
        </span>
      </SearchLink>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name{renderSortIcon('name')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex{renderSortIcon('sex')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born{renderSortIcon('born')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died{renderSortIcon('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const isSelected = person.slug === slug;

          const mother =
            person.mother ||
            (person.motherName ? peopleByName.get(person.motherName) : null);
          const father =
            person.father ||
            (person.fatherName ? peopleByName.get(person.fatherName) : null);

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
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
