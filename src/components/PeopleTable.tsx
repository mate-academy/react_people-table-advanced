import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  loading: boolean;
  order: string;
  sort: string;
};

export const PeopleTable = ({ people, loading, order, sort }: Props) => {
  const { slug } = useParams();

  const getPersonLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = people.find(p => p.name === name);

    if (person) {
      return <PersonLink person={person} />;
    }

    return name;
  };

  function getSortParams(sortBy: string): {
    sort: string | null;
    order?: string | null;
  } {
    if (sortBy === sort && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sortBy === sort) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy };
  }

  function getSortIcon(sortBy: string) {
    if (sort !== sortBy) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  }

  return (
    <>
      {!loading && (
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
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={
                  person.slug === String(slug) ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{getPersonLink(person.motherName)}</td>
                <td>{getPersonLink(person.fatherName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
