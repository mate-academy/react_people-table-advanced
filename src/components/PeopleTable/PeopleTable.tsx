import React from 'react';
import classnames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const headerSortColumns = ['Name', 'Sex', 'Born', 'Died'];
  const preparedPeople = people.map(person => {
    const father = people
      .find(
        fatherObj => fatherObj.name === person.fatherName,
      );

    const mother = people
      .find(
        motherObj => motherObj.name === person.motherName,
      );

    return { ...person, mother, father };
  });

  const handleSortParams = (event: React.MouseEvent) => {
    const sortColumnName
      = event.currentTarget.textContent?.toLowerCase();

    const params: {
      [key: string] : string,
    } = {};

    if (query) {
      params.query = query;
    }

    if (sortColumnName && sortBy !== sortColumnName) {
      params.sortBy = sortColumnName;
      params.sortOrder = 'asc';
    } else if (sortColumnName && sortOrder === 'asc') {
      params.sortBy = sortColumnName;
      params.sortOrder = 'desc';
    } else if (sortColumnName && sortOrder === 'desc') {
      params.sortBy = sortColumnName;
      params.sortOrder = 'asc';
    }

    setSearchParams(params);
  };

  const sortedPeople = sortBy
    ? preparedPeople.sort((x: Person, y: Person) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          if (sortOrder === 'asc') {
            return (x[sortBy]).localeCompare(y[sortBy]);
          }

          return (y[sortBy]).localeCompare(x[sortBy]);

        case 'born':
        case 'died':
          if (sortOrder === 'asc') {
            return +(x[sortBy]) - +(y[sortBy]);
          }

          return +(y[sortBy]) - +(x[sortBy]);

        default:
          return 0;
      }
    })
    : preparedPeople;

  return (
    <table className="table is-bordered is-fullwidth">
      <thead>
        <tr>
          {headerSortColumns.map(header => (
            <th
              key={header}
              className={classnames(
                'sorted-column',
                {
                  'sorted-column__asc': sortBy === header.toLowerCase()
                  && sortOrder === 'asc',
                  'sorted-column__desc': sortBy === header.toLowerCase()
                  && sortOrder === 'desc',
                },
              )}
              onClick={(event) => {
                handleSortParams(event);
              }}
            >
              {header}
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => {
          return (
            <tr
              key={person.slug}
              className={classnames(
                { 'is-selected': personId === person.slug },
              )}
            >
              <PersonRow person={person} sortBy={sortBy} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
