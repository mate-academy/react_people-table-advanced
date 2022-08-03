import { useEffect, useState } from 'react';
import { PersonRow } from './PersonRow';
import { Person } from './react-app-env';
import { getPeople } from './api';

type Props = {
  personSlug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({ personSlug }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedName, setSelectedName] = useState(people
    .find(person => person.slug === personSlug)
    ?.name || null);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeople = peopleFromServer.map(p => ({ ...p }));

      preparedPeople.forEach(person => {
        Object.assign(person, {
          mother: preparedPeople.find(m => m.name === person.motherName),
          father: preparedPeople.find(f => f.name === person.fatherName),
        });
      });
      setPeople(preparedPeople);
    });
  }, []);

  const handleSelectName = (name: string) => {
    setSelectedName(name);
  };

  return (
    <table className="PeopleTable Collapse">
      <thead>
        <tr>
          <th className="thead__bold">Name   </th>
          <th className="thead__bold">Sex   </th>
          <th className="thead__bold">Born   </th>
          <th className="thead__bold">Died   </th>
          <th className="thead__bold">Mother   </th>
          <th className="thead__bold">Father   </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            style={{
              backgroundColor: person.name === selectedName ? 'aquamarine' : '',
            }}
          >
            <PersonRow
              person={person}
              people={people}
              onSelectName={handleSelectName}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
