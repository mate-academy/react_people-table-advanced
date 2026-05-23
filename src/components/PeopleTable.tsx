/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  allPeople?: Person[];
};

export const PeopleTable = ({ people, allPeople }: Props) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const source = allPeople || people;

  const getPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return source.find(p => p.name === name) || null;
  };

  const getSortParams = (field: string): SearchParams => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortIcon = (field: string) => {
    if (currentSort !== field) {
      return <i className="fas fa-sort has-text-grey-light" />;
    }

    return currentOrder === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  const sortableColumns = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableColumns.map(col => (
            <th key={col}>
              <SearchLink
                params={getSortParams(col)}
                className="has-text-black is-unselectable"
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                <span className="icon is-small ml-1">
                  {renderSortIcon(col)}
                </span>
              </SearchLink>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = getPersonByName(person.motherName);
          const father = getPersonByName(person.fatherName);

          return (
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
