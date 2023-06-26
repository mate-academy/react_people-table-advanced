import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedPerson: string;
  sortBy: string;
  sortOrder: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  sortBy,
  sortOrder,
}) => {
  const getSortParams = (paramName: string): SearchParams => {
    switch (true) {
      case sortBy === paramName && !!sortOrder:
        return {
          sort: null,
          order: null,
        };

      case sortBy !== paramName:
        return {
          sort: paramName,
        };

      case sortBy === paramName:
        return {
          order: 'desc',
        };

      default:
        return {
          sort: null,
          order: null,
        };
    }
  };

  const getArrowClassName = (paramName: string) => {
    return classNames(
      'fas',
      { 'fa-sort': sortBy !== paramName },
      { 'fa-sort-up': sortBy === paramName && !sortOrder },
      { 'fa-sort-down': sortBy === paramName && !!sortOrder },
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getArrowClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getArrowClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getArrowClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getArrowClassName('died')} />
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
            data-cy="person"
            key={person.slug}
            className={classNames(
              { 'has-background-warning': person.slug === selectedPerson },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>

            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
