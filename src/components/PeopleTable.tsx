/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: 'name' | 'sex' | 'born' | 'died') => {
    let newSort: string | null = sort;
    let newOrder: string | null = order;

    if (sort !== field) {
      newSort = field;
      newOrder = null;
    } else if (!order) {
      newSort = field;
      newOrder = 'desc';
    } else {
      newSort = null;
      newOrder = null;
    }

    const newSearch = getSearchWith(searchParams, {
      sort: newSort,
      order: newOrder,
    });

    setSearchParams(newSearch);
  };

  const getSortIcon = (field: 'name' | 'sex' | 'born' | 'died') => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
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
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const nameClass =
            person.sex === 'f' ? 'has-text-danger' : 'has-text-link';

          const isSelected = person.slug === selectedSlug;

          const motherPerson = people.find(p => p.name === person.motherName);
          const fatherPerson = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: location.search,
                  }}
                  className={nameClass}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  motherPerson ? (
                    <Link
                      to={{
                        pathname: `/people/${motherPerson.slug}`,
                        search: location.search,
                      }}
                      className={
                        motherPerson.sex === 'f'
                          ? 'has-text-danger'
                          : 'has-text-link'
                      }
                    >
                      {motherPerson.name}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  fatherPerson ? (
                    <Link
                      to={{
                        pathname: `/people/${fatherPerson.slug}`,
                        search: location.search,
                      }}
                      className={
                        fatherPerson.sex === 'f'
                          ? 'has-text-danger'
                          : 'has-text-link'
                      }
                    >
                      {fatherPerson.name}
                    </Link>
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
