import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get('order');
  const sortField = searchParams.get('sort');

  const getSortParams = (columnName: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (currentSort === columnName && currentOrder !== 'desc') {
      return { sort: columnName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (columnName: string) => {
    if (sortField !== columnName) {
      return 'fas fa-sort';
    }

    return sortOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                Name
                <SearchLink params={getSortParams('name')}>
                  <span className="icon">
                    <i className={getSortIcon('name')}></i>
                  </span>
                </SearchLink>
              </th>

              <th>
                Sex
                <SearchLink params={getSortParams('sex')}>
                  <span className="icon">
                    <i className={getSortIcon('sex')}></i>
                  </span>
                </SearchLink>
              </th>

              <th>
                Born
                <SearchLink params={getSortParams('born')}>
                  <span className="icon">
                    <i className={getSortIcon('born')}></i>
                  </span>
                </SearchLink>
              </th>

              <th>
                Died
                <SearchLink params={getSortParams('died')}>
                  <span className="icon">
                    <i className={getSortIcon('died')}></i>
                  </span>
                </SearchLink>
              </th>

              <th>Mother</th>

              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={
                    person.slug === slug ? 'has-background-warning' : ''
                  }
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
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <PersonLink person={father} />
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
