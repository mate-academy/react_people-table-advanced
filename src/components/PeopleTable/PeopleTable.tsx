/* eslint-disable no-console */
import cn from 'classnames';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

type SortField = 'name' | 'sex' | 'born' | 'died';

const getSortParams = (
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) => {
  if (currentSort !== field) {
    return { sort: field, order: null };
  }

  if (currentOrder !== 'desc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

const getSortIcon = (
  field: SortField,
  currentSort: string | null,
  currentOrder: string | null,
) => {
  if (currentSort !== field) {
    return 'fas fa-sort';
  }

  if (currentOrder === 'desc') {
    return 'fas fa-sort-down';
  }

  return 'fas fa-sort-up';
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const columns: { label: string; field: SortField }[] = [
    { label: 'Name', field: 'name' },
    { label: 'Sex', field: 'sex' },
    { label: 'Born', field: 'born' },
    { label: 'Died', field: 'died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(sort, order, field)}>
                  <span className="icon">
                    <i className={getSortIcon(field, sort, order)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = slug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink personName={person.name} people={people} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink personName={person.motherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink personName={person.fatherName} people={people} />
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
