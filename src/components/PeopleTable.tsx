import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/enums';

type Props = {
  people: Person[];
  selectedPerson: string | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get(SearchParams.sort) || '';
  const sortOrder = searchParams.get(SearchParams.order) || '';

  const getSortValue = (name: string) => {
    return sortOrder === 'desc' && sortValue === name
      ? null
      : name;
  };

  const getSortOrder = (name: string) => {
    return sortValue === name && sortOrder !== 'desc'
      ? 'desc'
      : null;
  };

  const getSortIcon = (name: string) => {
    if (!sortOrder && sortValue === name) {
      return <i className="fa-solid fa-sort-up" />;
    }

    if (sortOrder === 'desc' && sortValue === name) {
      return <i className="fa-solid fa-sort-down" />;
    }

    return <i className="fas fa-sort" />;
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
              Name
              <SearchLink
                params={{
                  [SearchParams.sort]: getSortValue('name'),
                  [SearchParams.order]: getSortOrder('name'),
                }}
              >
                <span className="icon">
                  {getSortIcon('name')}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  [SearchParams.sort]: getSortValue('sex'),
                  [SearchParams.order]: getSortOrder('sex'),
                }}
              >
                <span className="icon">
                  {getSortIcon('sex')}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  [SearchParams.sort]: getSortValue('born'),
                  [SearchParams.order]: getSortOrder('born'),
                }}
              >
                <span className="icon">
                  {getSortIcon('born')}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  [SearchParams.sort]: getSortValue('died'),
                  [SearchParams.order]: getSortOrder('died'),
                }}
              >
                <span className="icon">
                  {getSortIcon('died')}
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
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);
          const fullPerson = {
            ...person,
            mother,
            father,
          };

          return (
            <PersonItem
              person={fullPerson}
              selectedPerson={selectedPerson}
              key={person.name}
            />
          );
        })}
      </tbody>
    </table>
  );
};
