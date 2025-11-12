/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';
// type SortOrder = 'asc' | 'desc';

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const getPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
  };

  const getSortedPeople = (listPeople: Person[]): Person[] => {
    if (!currentSort) {
      return listPeople;
    }

    const sorted = [...listPeople].sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (currentSort) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'sex':
          aValue = a.sex.toLowerCase();
          bValue = b.sex.toLowerCase();
          break;
        case 'born':
          aValue = a.born;
          bValue = b.born;
          break;
        case 'died':
          aValue = a.died;
          bValue = b.died;
          break;
        default:
          return 0;
      }

      if (currentOrder === 'desc') {
        if (aValue < bValue) {
          return 1;
        }

        if (aValue > bValue) {
          return -1;
        }
      } else {
        if (aValue < bValue) {
          return -1;
        }

        if (aValue > bValue) {
          return 1;
        }
      }

      return 0;
    });

    return sorted;
  };

  const filteredPeople = people.filter(person => {
    const queryByName =
      person.name.toLowerCase().includes(searchQuery) ||
      (person.motherName || '').toLowerCase().includes(searchQuery) ||
      (person.fatherName || '').toLowerCase().includes(searchQuery);

    if (!queryByName) {
      return false;
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length > 0) {
      const queryByCentury = Math.ceil(person.born / 100);

      if (!centuries.includes(String(queryByCentury))) {
        return false;
      }
    }

    return true;
  });

  const sortedPeople = getSortedPeople(filteredPeople);

  const getSortIcon = (field: SortField) => {
    if (currentSort !== field) {
      return 'fas fa-sort';
    }

    return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const getSortParams = (field: SortField) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentSort === field && !currentOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
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
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
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
          const mother = person.motherName
            ? getPersonByName(person.motherName)
            : null;
          const father = person.fatherName
            ? getPersonByName(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
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
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <span className="has-text-danger">{person.motherName}</span>
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
                    <span>{person.fatherName}</span>
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
