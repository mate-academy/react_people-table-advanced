import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const nameSortParams =
    sort !== 'name'
      ? { sort: 'name', order: null }
      : order !== 'desc'
        ? { sort: 'name', order: 'desc' }
        : { sort: null, order: null };

  const sexSortParams =
    sort !== 'sex'
      ? { sort: 'sex', order: null }
      : order !== 'desc'
        ? { sort: 'sex', order: 'desc' }
        : { sort: null, order: null };

  const bornSortParams =
    sort !== 'born'
      ? { sort: 'born', order: null }
      : order !== 'desc'
        ? { sort: 'born', order: 'desc' }
        : { sort: null, order: null };

  const diedSortParams =
    sort !== 'died'
      ? { sort: 'died', order: null }
      : order !== 'desc'
        ? { sort: 'died', order: 'desc' }
        : { sort: null, order: null };

  const getSortIcon = (field: string) => {
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
            <SearchLink params={nameSortParams}>
              Name
              <span className="icon">
                <i className={getSortIcon('name')} />
              </span>
            </SearchLink>
          </th>
          <th>
            <SearchLink params={sexSortParams}>
              <span className="icon">
                <i className={getSortIcon('sex')} />
              </span>
              Sex
            </SearchLink>
          </th>
          <th>
            <SearchLink params={bornSortParams}>
              <span className="icon">
                <i className={getSortIcon('born')} />
              </span>
              Born
            </SearchLink>
          </th>
          <th>
            <SearchLink params={diedSortParams}>
              <span className="icon">
                <i className={getSortIcon('died')} />
              </span>
              Died
            </SearchLink>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
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
              {!person.motherName ? (
                '-'
              ) : person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName
              )}
            </td>
            <td>
              {!person.fatherName ? (
                '-'
              ) : person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
