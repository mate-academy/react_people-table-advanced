import PersonLink from './PersonLink';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
  allPeople: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}

const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  allPeople,
  selectedPerson,
  setSelectedPerson,
}) => {
  const getPersonByName = (name: string | null) =>
    allPeople.find(p => p.name === name) || null;

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const toggleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <div className="box table-container">
      <table
        className="table is-striped is-hoverable is-narrow is-fullwidth"
        data-cy="peopleTable"
      >
        <thead>
          <tr>
            <th className="sortable">
              <span className="th-content">
                Name
                <span
                  className="sort-icons ml-1"
                  onClick={() => toggleSort('name')}
                >
                  <i
                    className={`fas fa-caret-up ${sort === 'name' && order !== 'desc' ? 'active' : ''}`}
                  />
                  <i
                    className={`fas fa-caret-down ${sort === 'name' && order === 'desc' ? 'active' : ''}`}
                  />
                </span>
              </span>
            </th>
            <th className="sortable">
              <span className="th-content">
                Sex
                <span
                  className="sort-icons ml-1"
                  onClick={() => toggleSort('sex')}
                >
                  <i
                    className={`fas fa-caret-up ${sort === 'sex' && order !== 'desc' ? 'active' : ''}`}
                  />
                  <i
                    className={`fas fa-caret-down ${sort === 'sex' && order === 'desc' ? 'active' : ''}`}
                  />
                </span>
              </span>
            </th>
            <th className="sortable">
              <span className="th-content">
                Born
                <span
                  className="sort-icons ml-1"
                  onClick={() => toggleSort('born')}
                >
                  <i
                    className={`fas fa-caret-up ${sort === 'born' && order !== 'desc' ? 'active' : ''}`}
                  />
                  <i
                    className={`fas fa-caret-down ${sort === 'born' && order === 'desc' ? 'active' : ''}`}
                  />
                </span>
              </span>
            </th>
            <th className="sortable">
              <span className="th-content">
                Died
                <span
                  className="sort-icons ml-1"
                  onClick={() => toggleSort('died')}
                >
                  <i
                    className={`fas fa-caret-up ${sort === 'died' && order !== 'desc' ? 'active' : ''}`}
                  />
                  <i
                    className={`fas fa-caret-down ${sort === 'died' && order === 'desc' ? 'active' : ''}`}
                  />
                </span>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => {
            const isSelected = selectedPerson?.slug === person.slug;
            const mother = getPersonByName(person.motherName);
            const father = getPersonByName(person.fatherName);

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : ''}
              >
                <td>
                  <PersonLink
                    person={person}
                    setSelectedPerson={setSelectedPerson}
                  />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    mother ? (
                      <PersonLink
                        person={mother}
                        setSelectedPerson={setSelectedPerson}
                      />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    father ? (
                      <PersonLink
                        person={father}
                        setSelectedPerson={setSelectedPerson}
                      />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
