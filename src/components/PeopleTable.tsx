import { useContext } from 'react';
import { PeopleContext } from '../store/peopleContext';
import { PeopleItem } from './PeopleItem';
import { FiltersContext } from '../store/filtersContext';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const { filterBySex, filterByName, filterByCentury } =
    useContext(FiltersContext);

  const filteredPeople = filterBySex(filterByCentury(filterByName(people)));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
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
        {filteredPeople.map((person, index) => (
          <PeopleItem key={index} person={person} />
        ))}

        {/* <tr data-cy="person" className="has-background-warning">
          <td>
            <a href="#/people/jan-frans-van-brussel-1761">
              Jan Frans van Brussel
            </a>
          </td>

          <td>m</td>
          <td>1761</td>
          <td>1833</td>
          <td>-</td>

          <td>
            <a href="#/people/jacobus-bernardus-van-brussel-1736">
              Jacobus Bernardus van Brussel
            </a>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};
