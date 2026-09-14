import PersonLink from './PersonLink';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { useState } from 'react';

import { useParams } from 'react-router-dom';

interface PersonTableProps {
  databaseFiltered: Person[];
}

const PersonTable = ({ databaseFiltered }: PersonTableProps) => {
  const { slug } = useParams();
  const [directionSex, setDirectionSex] = useState('asc');
  const [directionName, setDirectionName] = useState('asc');
  const [directionBorn, setDirectionBorn] = useState('asc');
  const [directionDied, setDirectionDied] = useState('asc');

  function getDirectionName() {
    if (directionName === 'asc') {
      setDirectionName('desc');

      return 'desc';
    } else {
      setDirectionName('asc');

      return 'asc';
    }
  }

  function getDirectionDied() {
    if (directionDied === 'asc') {
      setDirectionDied('desc');

      return 'desc';
    } else {
      setDirectionDied('asc');

      return 'asc';
    }
  }

  function getDirectionBorn() {
    if (directionBorn === 'asc') {
      setDirectionBorn('desc');

      return 'desc';
    } else {
      setDirectionBorn('asc');

      return 'asc';
    }
  }

  function getDirectionSex() {
    if (directionSex === 'asc') {
      setDirectionSex('desc');

      return 'desc';
    } else {
      setDirectionSex('asc');

      return 'asc';
    }
  }

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
                directionName,
              }}
              onClick={() => {
                getDirectionName();
              }}
            >
              Name
            </SearchLink>
          </th>
          <th>
            <SearchLink
              params={{
                sort: 'sex',
                directionSex,
              }}
              onClick={() => {
                getDirectionSex();
              }}
            >
              Sex
            </SearchLink>
          </th>
          <th>
            <SearchLink
              params={{
                sort: 'born',
                directionBorn,
              }}
              onClick={() => {
                getDirectionBorn();
              }}
            >
              Born
            </SearchLink>
          </th>
          <th>
            <SearchLink
              params={{
                sort: 'died',
                directionDied,
              }}
              onClick={() => {
                getDirectionDied();
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
