import { useContext } from 'react';
import { useSearchParams } from '../utils/useSearchParams';
import { PeopleContext } from '../PeopleContext';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const {
    people,
  } = useContext(PeopleContext);

  const {
    sex,
    query,
    centuriesUrl,
  } = useSearchParams();

  const getCentury = (year: number) => {
    return (
      Math.ceil(year / 100).toString()
    );
  };

  const filterPeople = () => {
    let filteredPeople = people;

    if (query) {
      const queryLowerCase = query.toLowerCase();

      filteredPeople = filteredPeople
        .filter(person => person.name.toLowerCase().includes(queryLowerCase)
          || (person.fatherName && person.fatherName.toLowerCase()
            .includes(queryLowerCase))
          || (person.motherName && person.motherName.toLowerCase()
            .includes(queryLowerCase)));
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuriesUrl && centuriesUrl.length > 0) {
      filteredPeople = filteredPeople.filter(person => centuriesUrl
        .includes(getCentury(person.born)));
    }

    return filteredPeople;
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
        {filterPeople()?.map(person => {
          return (
            <PersonLink person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};
