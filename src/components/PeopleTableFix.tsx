import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

type Props = {
  name?: string;
  sex?: string;
  century?: number[];
  people: Person[];
};

export const PeopleTableFix = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') ?? 'asc';
  const { slug } = useParams();

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  function renderPeople(
    peoplelist: Person[],
    query: string,
    sex = '',
    centuries: number[] = [],
    sortField = '',
    sortOrder = '',
  ) {
    let result = peoplelist;

    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
      if (sex === 'none') {
        result = peoplelist;
      }
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100)),
      );
    }

    if (sortField) {
      result = [...result].sort((a, b) => {
        const dir = sortOrder === 'asc' ? 1 : -1;

        switch (sortField) {
          case 'name':
          case 'sex':
            return a[sortField].localeCompare(b[sortField]) * dir;
          case 'born':
          case 'died':
            return (a[sortField] - b[sortField]) * dir;
          default:
            return 0;
        }
      });
    }

    return result;
  }

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === field) {
      if (order === 'asc') {
        params.set('order', 'desc');
      } else {
        params.delete('sort');
        params.delete('order');
      }
    } else {
      params.set('sort', field);
      params.set('order', 'asc');
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
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <span>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </span>
            </span>
          </th>
          <th onClick={() => handleSort('sex')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </span>
            </span>
          </th>
          <th onClick={() => handleSort('born')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </span>
            </span>
          </th>
          <th onClick={() => handleSort('died')} style={{ cursor: 'pointer' }}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </span>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          renderPeople(
            props.people,
            props.name ?? '',
            props.sex ?? '',
            props.century ?? [],
            sort,
            order,
          ).map(person => (
            <tr 
              data-cy="person" 
              key={person.slug} 
              className={person.slug === slug ? 'has-background-warning' : ''}
            > 
              <td>
                <a
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  href={`#/people/${person.slug}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.mother ? (
                  <a
                    className="has-text-danger"
                    href={`#/people/${person.mother.slug}`}
                  >
                    {person.mother.name}
                  </a>
                ) : (
                  (person.motherName ?? '-')
                )}
              </td>

              <td>
                {person.father ? (
                  <a href={`#/people/${person.father.slug}`}>
                    {person.father.name}
                  </a>
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
