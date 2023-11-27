import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from '../utils/useSearchParams';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { id } = useParams();

  const {
    sex,
    query,
    centuriesUrl,
  } = useSearchParams();

  const filterPeople = () => {
    let filteredPeople = people;

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const queryLowerCase = query.toLowerCase();

      filteredPeople = filteredPeople
        .filter(person => person.name.toLowerCase().includes(queryLowerCase)
          || (person.fatherName && person.fatherName.toLowerCase()
            .includes(queryLowerCase))
          || (person.motherName && person.motherName.toLowerCase()
            .includes(queryLowerCase)));
    }

    if (centuriesUrl && centuriesUrl.length > 0) {
      filteredPeople = filteredPeople.filter(person => centuriesUrl
        .includes(Math.ceil(person.born / 100).toString()));
    }

    return filteredPeople;
  };

  const findParent = (parentName: string) => {
    const parent = people.find(({ name }) => name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterPeople().length
          ? filterPeople().map((person) => (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === id,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {
                  person.motherName ? findParent(person.motherName) : '-'
                }
              </td>

              <td>
                {
                  person.fatherName ? findParent(person.fatherName) : '-'
                }
              </td>
            </tr>
          )) : 'There are no people matching the current search criteria'}
      </tbody>
    </table>
  );
};
