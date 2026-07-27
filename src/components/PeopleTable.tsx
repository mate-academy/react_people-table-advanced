/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams, Link } from 'react-router-dom';

interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
}

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const { slug } = useParams();

  const findPerson = (name: string | null) =>
    name ? people.find(p => p.name === name) || null : null;

  function handleSort(field: string) {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else if (order === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
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
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${sort !== 'name' ? 'fa-sort' : order === 'desc' ? 'fa-sort-down' : 'fa-sort-up'}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${sort !== 'sex' ? 'fa-sort' : order === 'desc' ? 'fa-sort-down' : 'fa-sort-up'}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${sort !== 'born' ? 'fa-sort' : order === 'desc' ? 'fa-sort-down' : 'fa-sort-up'}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${sort !== 'died' ? 'fa-sort' : order === 'desc' ? 'fa-sort-down' : 'fa-sort-up'}`}
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
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          const selected = person.slug === slug;
          const rowClass = selected ? 'has-background-warning' : '';

          return (
            <tr data-cy="person" key={person.slug} className={rowClass}>
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={person.sex === 'f' ? 'has-text-danger' : 'is-link'}
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
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="is-link"
                  >
                    {person.fatherName}
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
