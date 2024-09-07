/* eslint-disable */
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { TitleFilter } from '../TitleFilter/TitleFilter';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <TitleFilter />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {people.find(
                personName => person.motherName === personName.name,
              ) ? (
                <PersonLink
                  person={
                    people.find(
                      currentPerson => currentPerson.name === person.motherName,
                    )!
                  }
                />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {people.find(
                personName => person.fatherName === personName.name,
              ) ? (
                <PersonLink
                  person={
                    people.find(
                      currentPerson => currentPerson.name === person.fatherName,
                    )!
                  }
                />
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
