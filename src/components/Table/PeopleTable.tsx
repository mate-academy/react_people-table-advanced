import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableHeadLink } from './TableHeadLink';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleWithParents: Person[] = people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });

  const [searchParams] = useSearchParams();

  const sortPeople = (peopleArray: Person[]) => {
    const sortBy = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    const sortedArray = [...peopleArray].sort((person1, person2) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return person1[sortBy].localeCompare(person2[sortBy]);

        case 'born':
        case 'died':
          return Number(person1[sortBy]) - Number(person2[sortBy]);

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      return sortedArray.reverse();
    }

    return sortedArray;
  };

  const filterPeople = (peopleArray: Person[]) => {
    const sex = searchParams.get('sex');
    const prepareQuery = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');
    let filteredPeople = peopleArray;

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (prepareQuery) {
      filteredPeople = filteredPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(prepareQuery)
          || person.mother?.name.toLowerCase().includes(prepareQuery)
          || person.father?.name.toLowerCase().includes(prepareQuery)
        );
      });
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(bornCentury);
      });
    }

    return filteredPeople;
  };

  const filteredPeople = filterPeople(peopleWithParents);
  const visiblePeople = sortPeople(filteredPeople);

  return (
    visiblePeople.length
      ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <TableHeadLink text="Name" />
              <TableHeadLink text="Sex" />
              <TableHeadLink text="Born" />
              <TableHeadLink text="Died" />

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => (
              <PersonLink
                key={person.slug}
                person={person}
              />
            ))}
          </tbody>
        </table>
      )
      : (
        <p>There are no people matching the current search criteria</p>
      )
  );
};
