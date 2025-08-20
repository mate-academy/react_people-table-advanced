import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selected: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selected }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const name = query.trim().toLowerCase();

  function getSortState(field: string, sortField: string, orderNumber: string) {
    if (sortField !== field) {
      return 0;
    }

    if (!orderNumber) {
      return 1;
    }

    return 2;
  }

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      name === '' ||
      person.name.toLowerCase().includes(name) ||
      person.fatherName?.toLowerCase().includes(name) ||
      person.motherName?.toLowerCase().includes(name);

    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.some(c => {
        const start = Number(c) * 100;
        const end = start + 99;

        return person.born >= start && person.born <= end;
      });

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      switch (sort) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'sex':
          valA = a.sex.toLowerCase();
          valB = b.sex.toLowerCase();
          break;
        case 'born':
          valA = a.born;
          valB = b.born;
          break;
        case 'died':
          valA = a.died;
          valB = b.died;
          break;
        default:
          break;
      }

      if (valA < valB) {
        return order === 'desc' ? 1 : -1;
      }

      if (valA > valB) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
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
            Name
            <SearchLink
              params={{
                sort: sort !== 'name' ? 'name' : !order ? 'name' : null,
                order:
                  sort === 'name' && !order
                    ? 'desc'
                    : sort === 'name' && order
                      ? null
                      : null,
              }}
            >
              <span className="icon">
                {getSortState('name', sort, order) === 0 && (
                  <i className="fas fa-sort" />
                )}
                {getSortState('name', sort, order) === 1 && (
                  <i className="fas fa-sort-up" />
                )}
                {getSortState('name', sort, order) === 2 && (
                  <i className="fas fa-sort-down" />
                )}
              </span>
            </SearchLink>
          </th>

          <th>
            Sex
            <SearchLink
              params={{
                sort: sort !== 'sex' ? 'sex' : !order ? 'sex' : null,
                order:
                  sort === 'sex' && !order
                    ? 'desc'
                    : sort === 'sex' && order
                      ? null
                      : null,
              }}
            >
              <span className="icon">
                {getSortState('sex', sort, order) === 0 && (
                  <i className="fas fa-sort" />
                )}
                {getSortState('sex', sort, order) === 1 && (
                  <i className="fas fa-sort-up" />
                )}
                {getSortState('sex', sort, order) === 2 && (
                  <i className="fas fa-sort-down" />
                )}
              </span>
            </SearchLink>
          </th>

          <th>
            Born
            <SearchLink
              params={{
                sort: sort !== 'born' ? 'born' : !order ? 'born' : null,
                order:
                  sort === 'born' && !order
                    ? 'desc'
                    : sort === 'born' && order
                      ? null
                      : null,
              }}
            >
              <span className="icon">
                {getSortState('born', sort, order) === 0 && (
                  <i className="fas fa-sort" />
                )}
                {getSortState('born', sort, order) === 1 && (
                  <i className="fas fa-sort-up" />
                )}
                {getSortState('born', sort, order) === 2 && (
                  <i className="fas fa-sort-down" />
                )}
              </span>
            </SearchLink>
          </th>

          <th>
            Died
            <SearchLink
              params={{
                sort: sort !== 'died' ? 'died' : !order ? 'died' : null,
                order:
                  sort === 'died' && !order
                    ? 'desc'
                    : sort === 'died' && order
                      ? null
                      : null,
              }}
            >
              <span className="icon">
                {getSortState('died', sort, order) === 0 && (
                  <i className="fas fa-sort" />
                )}
                {getSortState('died', sort, order) === 1 && (
                  <i className="fas fa-sort-up" />
                )}
                {getSortState('died', sort, order) === 2 && (
                  <i className="fas fa-sort-down" />
                )}
              </span>
            </SearchLink>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => {
          const mother = people.find(x => x.name === person.motherName);
          const father = people.find(x => x.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selected === person.slug,
              })}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  person.fatherName
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
