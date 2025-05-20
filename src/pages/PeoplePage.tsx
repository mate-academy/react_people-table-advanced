import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

export const PeoplePage = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(query.toLowerCase())) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(query.toLowerCase()));

    const matchesSex = !sex || person.sex === sex;

    const matchesCentury =
      centuries.length === 0 ||
      centuries.some(century => {
        const centuryStart = (parseInt(century) - 1) * 100 + 1;
        const centuryEnd = parseInt(century) * 100;

        return person.born >= centuryStart && person.born <= centuryEnd;
      });

    return matchesQuery && matchesSex && matchesCentury;
  });

  return (
    <div className="columns">
      <div className="column is-3-tablet is-2-desktop">
        <PeopleFilters />
      </div>

      <div className="column is-9-tablet is-10-desktop">
        <PeopleTable people={filteredPeople} />
      </div>
    </div>
  );
};
