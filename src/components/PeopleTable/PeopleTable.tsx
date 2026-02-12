/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';
interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') as SortField | null;
  const currentOrder = searchParams.get('order');

  const getNextSortParams = (field: SortField) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (!currentOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: SortField) => {
    if (currentSort !== field) {
      return 'fas fa-sort';
    }

    return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const sortedPeople = [...people];

  if (currentSort) {
    sortedPeople.sort((a, b) => {
      let result = 0;

      switch (currentSort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;

        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;

        case 'born':
          result = a.born - b.born;
          break;

        case 'died':
          result = a.died - b.died;
          break;
      }

      return currentOrder === 'desc' ? -result : result;
    });
  }

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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const motherObj = people.find(per => per.name === person.motherName);
          const fatherObj = people.find(per => per.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                <PersonLink person={motherObj || person.motherName} />
              </td>

              <td>
                <PersonLink person={fatherObj || person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
