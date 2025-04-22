/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, Link } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
export const PeopleTable = ({sortBy, peoples,sortOrder, setSortBy,sortPeople,setSortOrder}) => {
  const { slug } = useParams();

  const handleSort = (field: string) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortBy(null);
      setSortOrder(null);
    }
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
                <span className="icon" onClick={()=> handleSort('name')}>
                <i className={`fas ${
    sortBy !== 'name' ? 'fa-sort'
    : sortOrder === 'asc' ? 'fa-sort-up'
    : sortOrder === 'desc' ? 'fa-sort-down'
    : 'fa-sort'
  }`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className={`fas ${
    sortBy !== 'sex' ? 'fa-sort'
    : sortOrder === 'asc' ? 'fa-sort-up'
    : sortOrder === 'desc' ? 'fa-sort-down'
    : 'fa-sort'
  }`} onClick={()=>{handleSort('sex')}} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className={`fas ${
    sortBy !== 'born' ? 'fa-sort'
    : sortOrder === 'asc' ? 'fa-sort-up'
    : sortOrder === 'desc' ? 'fa-sort-down'
    : 'fa-sort'
  }`} onClick={()=>{handleSort('born')}} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className={`fas ${
    sortBy !== 'died' ? 'fa-sort'
    : sortOrder === 'asc' ? 'fa-sort-up'
    : sortOrder === 'desc' ? 'fa-sort-down'
    : 'fa-sort'
  }`} onClick={()=>{handleSort('died')}}/>
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
