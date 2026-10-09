import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const peopleByName = new Map<string, Person>();

  people.forEach(person => peopleByName.set(person.name, person));

  const getSortParams = (field: string): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-unselectable">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIconClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-unselectable">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIconClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-unselectable">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIconClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-unselectable">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIconClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;
          const mother = person.motherName
            ? peopleByName.get(person.motherName)
            : null;
          const father = person.fatherName
            ? peopleByName.get(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
