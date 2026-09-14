import PersonLink from './PersonLink';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';

import { useParams } from 'react-router-dom';

interface PersonTableProps {
  databaseFiltered: Person[];
}

const PersonTable = ({ databaseFiltered }: PersonTableProps) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable 
                  is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SearchLink
              params={{
                sort: 'name',
              }}
            >
              Name
            </SearchLink>
          </th>
          <th>
            <SearchLink
              params={{
                sort: 'sex',
              }}
            >
              Sex
            </SearchLink>
          </th>
          <th>
            <SearchLink
              params={{
                sort: 'born',
              }}
            >
              Born
            </SearchLink>
          </th>
          <th>
            <SearchLink
              params={{
                sort: 'died',
              }}
            >
              Died
            </SearchLink>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {databaseFiltered.map(person => {
          const mom = databaseFiltered.find(p => p.name === person.motherName);
          const dad = databaseFiltered.find(p => p.name === person.fatherName);

          return (
            <tr
              className={slug === person.slug ? 'has-background-warning' : ''}
              data-cy="person"
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mom ? <PersonLink person={mom} /> : person.motherName || '-'}
              </td>

              <td>
                {dad ? <PersonLink person={dad} /> : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PersonTable;
