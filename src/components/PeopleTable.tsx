import { useContext } from 'react';

import { Person } from '../types/Person';
import { SearchParamsContext } from './SearchParamsContext';
import { SortTypeLink } from './SortTypeLink';
import { PersonInfo } from './PersonInfo';

const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  let visiblePeople = [...people];

  const { searchParams } = useContext(SearchParamsContext);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const currentSexFilter = searchParams.get('sex');
  const currentQueryFilter = searchParams.get('query');
  const currentCenturiesFilter = searchParams.getAll('centuries');

  if (currentSexFilter) {
    visiblePeople = visiblePeople.filter(({ sex }) => sex === currentSexFilter);
  }

  if (currentQueryFilter) {
    visiblePeople = visiblePeople.filter(({ name }) => {
      const nameLowercased = name.toLowerCase();
      const currentQueryFilterLowercased = currentQueryFilter.toLowerCase();

      return nameLowercased.includes(currentQueryFilterLowercased);
    });
  }

  if (currentCenturiesFilter.length) {
    visiblePeople = visiblePeople.filter(({ born, died }) => {
      const bornCentury = Math.ceil(born / 100);
      const diedCentury = Math.ceil(died / 100);
      const personLifeCenturies = [bornCentury, diedCentury];

      return personLifeCenturies.some(century => (
        currentCenturiesFilter.includes(String(century))
      ));
    });
  }

  if (sort) {
    visiblePeople.sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);

        case 'born':
        case 'died':
          return personA[sort] - personB[sort];

        default:
          return 0;
      }
    });

    if (order) {
      visiblePeople.reverse();
    }
  }

  return (
    visiblePeople.length
      ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sortTypes.map(name => (
                <th key={name}>
                  <SortTypeLink name={name} />
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => (
              <PersonInfo key={person.slug} person={person} />
            ))}
          </tbody>
        </table>
      )
      : (
        <p>
          There are no people matching the current search criteria
        </p>
      )
  );
};
