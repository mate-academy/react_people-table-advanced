import React, { useContext, MouseEventHandler } from 'react';
import { PeopleContext } from './PeopleContext';
import { PersonRow, Person } from './PersonRow';

const styleForTable: React.CSSProperties = {
  borderCollapse: 'collapse',
};

export const PeopleTable = React.memo(
  (props: {
    handleSortChange: MouseEventHandler;
    sortBy: string;
    sortOrder: string;
    query: string;
  }) => {
    const { people } = useContext(PeopleContext);
    const lowerQuery = props.query.toLowerCase();
    const {
      sortBy, handleSortChange, sortOrder, query,
    } = props;

    const getFilteredPeople = (): Person[] => {
      if (query) {
        return people.filter((person: Person) => {
          if (!person.name || !person.motherName || !person.fatherName) {
            return null;
          }

          return person.name.toLocaleLowerCase().includes(lowerQuery)
          || person.motherName.toLocaleLowerCase().includes(lowerQuery)
          || person.fatherName.toLocaleLowerCase().includes(lowerQuery);
        });
      }

      return people;
    };

    const filteredPeople = getFilteredPeople();

    const getSortPeople = (): Person[] => {
      let persons = people;

      if (sortBy && sortOrder === 'asc') {
        switch (sortBy) {
          case 'name':
          case 'sex':
            persons = [...filteredPeople]
              .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
            break;
          case 'born':
          case 'died':
            persons = [...filteredPeople]
              .sort((a, b) => +a[sortBy] - +b[sortBy]);
            break;
          default:
            persons = [...filteredPeople];
        }
      }

      if (sortBy && sortOrder === 'desc') {
        persons = [...filteredPeople].reverse();
      }

      if (!sortBy && !sortOrder) {
        persons = filteredPeople;
      }

      return persons;
    };

    const getParent = (parentName: string) => {
      return getSortPeople().find((person: Person) => parentName === person.name);
    };

    const showOrderIMG = (title: string) => {
      if (sortOrder === 'asc' && sortBy === title) {
        return <img src="images/sort_asc.png" alt={title} />;
      }

      if (sortOrder === 'desc' && sortBy === title) {
        return <img src="images/sort_desc.png" alt={title} />;
      }

      return <img src="images/sort_both.png" alt={title} />;
    };

    return (
      <div className="table_root">
        <table
          style={styleForTable}
          className="table
            is-bordered
            is-striped
            is-narrow
            is-hoverable
            is-fullwidth"
        >
          <thead>
            <tr onClick={handleSortChange}>
              <th>
                Name
                {showOrderIMG('name')}
              </th>
              <th>
                Sex
                {showOrderIMG('sex')}
              </th>
              <th>
                Born
                {showOrderIMG('born')}
              </th>
              <th>
                Died
                {showOrderIMG('died')}
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {getSortPeople().map((person: Person) => (
              <PersonRow
                key={person.name}
                person={person}
                mother={getParent(person.motherName)}
                father={getParent(person.fatherName)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
