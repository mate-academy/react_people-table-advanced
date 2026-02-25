/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import { ParentLink } from './ParentLink';
import { Person } from '../types/Person';
import { SortField } from '../types/SortField';

type PeopleTableProps = {
  people: Person[];
  sort: SortField | null;
  order: 'asc' | 'desc' | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sort,
  order,
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const search = searchParams.toString();

  const getNextParams = (column: SortField) => {
    if (sort !== column) {
      return { sort: column, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: SortField) => {
    if (sort !== column) {
      return <i className="fas fa-sort" />;
    }

    return order === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
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
              Name
              <SearchLink params={getNextParams('name')} className="icon ml-1">
                {getSortIcon('name')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextParams('sex')} className="icon ml-1">
                {getSortIcon('sex')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextParams('born')} className="icon ml-1">
                {getSortIcon('born')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextParams('died')} className="icon ml-1">
                {getSortIcon('died')}
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = location.pathname === `/people/${person.slug}`;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                isSelected ? 'is-selected has-background-warning' : undefined
              }
            >
              <td>
                <PersonLink
                  slug={person.slug}
                  name={person.name}
                  sex={person.sex}
                  search={search}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                <ParentLink
                  name={person.mother.name}
                  slug={person.mother.slug}
                  sex="f"
                  search={search}
                />
              </td>

              <td>
                <ParentLink
                  name={person.father.name}
                  slug={person.father.slug}
                  sex="m"
                  search={search}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
