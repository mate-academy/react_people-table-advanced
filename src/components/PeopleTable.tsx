/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, Link } from 'react-router-dom';
import { PersonLink } from './PersonLink';
export const PeopleTable = ({
  searchParams,
  setSearchParams,
  sortBy,
  peoples,
  sortOrder,

  sortPeople,
}) => {
  const { slug } = useParams();

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
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
              <a href="#/people?sort=name">
                <span
                  className="icon"
                  onClick={e => {
                    e.preventDefault();
                    handleSort('name');
                  }}
                >
                  <i
                    className={`fas ${
                      sortBy !== 'name'
                        ? 'fa-sort'
                        : sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : sortOrder === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy !== 'sex'
                        ? 'fa-sort'
                        : sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : sortOrder === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      handleSort('sex');
                    }}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy !== 'born'
                        ? 'fa-sort'
                        : sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : sortOrder === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      handleSort('born');
                    }}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy !== 'died'
                        ? 'fa-sort'
                        : sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : sortOrder === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      handleSort('died');
                    }}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortPeople.map(people => {
          const mother = peoples.find(
            woman => woman.name === people.motherName,
          );
          const father = peoples.find(man => man.name === people.fatherName);

          return (
            <tr
              data-cy="person"
              key={people.slug}
              className={people.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  className={people.sex === 'f' ? 'has-text-danger' : ''}
                  to={`/people/${people.slug}`}
                >
                  {people.name}
                </Link>
              </td>
              <td>{people.sex}</td>
              <td>{people.born}</td>
              <td>{people.died}</td>
              <td>
                {!people.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  people.motherName
                )}
              </td>
              <td>
                {!people.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  people.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
