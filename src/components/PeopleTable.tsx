import React, {
  SetStateAction,
  Dispatch,
} from 'react';
import { Person } from '../types';
import { SortType, PropName } from '../types/enum';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
  handleSort: (value: string) => void,
  sortOrder: SortType,
  sortField: string | null,
  searchParams: URLSearchParams,
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  handleSort,
  sortOrder,
  sortField,
  searchParams,
  setSearchParams,
}) => {
  const handleSelection = (slug: string | '') => {
    if (slug) {
      searchParams.set('slug', slug);

      setSearchParams(searchParams);
    }
  };

  const location = searchParams.get('slug');

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
              <a
                href="#/people?sort=name"
                onClick={() => handleSort(PropName.Name)}
              >
                <span className="icon">
                  {sortOrder === SortType.Asc && sortField === PropName.Name
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.Desc && sortField === PropName.Name
                   && <i className="fas fa-sort-down" />}
                  {![SortType.Asc, SortType.Desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.Asc, SortType.Desc].includes(sortOrder)
                   && sortField !== PropName.Name
                   && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={() => handleSort(PropName.Sex)}
              >
                <span className="icon">
                  {sortOrder === SortType.Asc && sortField === PropName.Sex
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.Desc && sortField === PropName.Sex
                   && <i className="fas fa-sort-down" />}
                  {![SortType.Asc, SortType.Desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.Asc, SortType.Desc].includes(sortOrder)
                   && sortField !== PropName.Sex
                   && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={() => handleSort(PropName.Born)}
              >
                <span className="icon">
                  {sortOrder === SortType.Asc && sortField === PropName.Born
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.Desc && sortField === PropName.Born
                   && <i className="fas fa-sort-down" />}
                  {![SortType.Asc, SortType.Desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.Asc, SortType.Desc].includes(sortOrder)
                   && sortField !== PropName.Born
                   && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={() => handleSort(PropName.Died)}
              >
                <span className="icon">
                  {sortOrder === SortType.Asc && sortField === PropName.Died
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.Desc && sortField === PropName.Died
                   && <i className="fas fa-sort-down" />}
                  {![SortType.Asc, SortType.Desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.Asc, SortType.Desc].includes(sortOrder)
                   && sortField !== PropName.Died
                    && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {people.map((person) => {
          return (
            <tr
              key={person.name}
              className={location === person.slug
                ? 'has-background-warning'
                : ''}
            >
              <td>
                <SearchLink
                  params={{ slug: [String(person.slug)] }}
                  className={person.sex === 'f'
                    ? ('has-text-danger')
                    : ''}
                  role="button"
                  onClick={() => handleSelection(person.slug)}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (
                    <SearchLink
                      params={{ slug: [String(person.mother?.slug)] }}
                      className="has-text-danger"
                      onClick={() => {
                        handleSelection(person.mother?.slug || '');
                      }}
                    >
                      {person.mother.name}
                    </SearchLink>
                  ) : (
                    <p>
                      {person.motherName}
                    </p>
                  )}
              </td>
              <td>
                {person.father
                  ? (
                    <SearchLink
                      params={{ slug: [String(person.father?.slug)] }}
                      onClick={() => {
                        handleSelection(person.father?.slug || '');
                      }}
                    >
                      {person.father.name}
                    </SearchLink>
                  ) : (
                    <p>
                      {person.fatherName}
                    </p>
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
