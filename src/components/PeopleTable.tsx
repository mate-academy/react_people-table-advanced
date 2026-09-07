import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  allPeople: Person[];
};

export const PeopleTable = ({ people, allPeople }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: SortField) => {
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
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const renderSortableHeader = (title: string, field: SortField) => (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}

        <SearchLink
          params={getSortParams(field)}
          aria-label={`Sort by ${title}`}
        >
          <span className="icon">
            <i className={getSortIcon(field)} />
          </span>
        </SearchLink>
      </span>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortableHeader('Name', 'name')}
          {renderSortableHeader('Sex', 'sex')}
          {renderSortableHeader('Born', 'born')}
          {renderSortableHeader('Died', 'died')}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = allPeople.find(
            candidate => candidate.name === person.motherName,
          );

          const father = allPeople.find(
            candidate => candidate.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
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
