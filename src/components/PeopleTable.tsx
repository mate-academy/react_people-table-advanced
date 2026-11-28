/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[];
  selectedPerson?: Person;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isDescending = order === 'desc';

  const isSelected = (sorted: string) => {
    if (sorted === sort) {
      return true;
    } else {
      return false;
    }
  };

  const handleSort = (field: string) => {
    if (sort !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else if (sort === field && isDescending === true) {
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const findPersonByName = (name: string | null) =>
    name ? people.find(person => person.name === name) : undefined;

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
              <a href="#" onClick={() => handleSort('name')}>
                <span className="icon">
                  <i
                    className={
                      isSelected('name')
                        ? isDescending
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#" onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i
                    className={
                      isSelected('sex')
                        ? isDescending
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#" onClick={() => handleSort('born')}>
                <span className="icon">
                  <i
                    className={
                      isSelected('born')
                        ? isDescending
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#" onClick={() => handleSort('died')}>
                <span className="icon">
                  <i
                    className={
                      isSelected('died')
                        ? isDescending
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort-up'
                        : 'fas fa-sort'
                    }
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
        {people.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPerson?.slug,
              })}
            >
              <td>
                <Link
                  to={{ pathname: `/people/${person.slug}`, search }}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <Link
                    to={{ pathname: `/people/${mother.slug}`, search }}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={{ pathname: `/people/${father.slug}`, search }}
                    className="has-text-danger"
                  >
                    {father.name}
                  </Link>
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
