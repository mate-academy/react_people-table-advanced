/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sort: string | null;
  order: string | null;
};

function getSortIconClass(
  field: string,
  sort: string | null,
  order: string | null,
) {
  if (sort !== field) {
    return 'fas fa-sort';
  }

  return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
}

function getSortParams(
  field: string,
  sort: string | null,
  order: string | null,
) {
  if (sort !== field) {
    return {
      sort: field,
      order: null,
    };
  }

  if (order !== 'desc') {
    return {
      sort: field,
      order: 'desc',
    };
  }

  return {
    sort: null,
    order: null,
  };
}

export const PeopleTable = ({ people, selectedSlug, sort, order }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name', sort, order)}>
                <span className="icon">
                  <i className={getSortIconClass('name', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex', sort, order)}>
                <span className="icon">
                  <i className={getSortIconClass('sex', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born', sort, order)}>
                <span className="icon">
                  <i className={getSortIconClass('born', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died', sort, order)}>
                <span className="icon">
                  <i className={getSortIconClass('died', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
