import { useContext } from 'react';
import { PeopleContext } from '../store/peopleContext';
import { PeopleItem } from './PeopleItem';
import { FiltersContext } from '../store/filtersContext';
import { SortContext, SortBy } from '../store/sortContext';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const labels = ['name', 'sex', 'born', 'died'];

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const { filterBySex, filterByName, filterByCentury } =
    useContext(FiltersContext);

  const { sort, order, sortPeople } = useContext(SortContext);

  const setSortBy = (s: SortBy) => {
    if (sort === s) {
      if (!order) {
        return { sort: s, order: 'desc' };
      } else {
        return { sort: null, order: null };
      }
    }

    return { sort: s, order: null };
  };

  const filteredPeople = sortPeople(
    filterBySex(filterByCentury(filterByName(people))),
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {labels.map((label, index) => (
            <th key={index}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label[0].toUpperCase() + label.slice(1)}
                <SearchLink params={setSortBy(label as SortBy)}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        { 'fa-sort': sort !== (label as SortBy) },
                        { 'fa-sort-up': sort === (label as SortBy) && !order },
                        { 'fa-sort-down': sort === (label as SortBy) && order },
                      )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

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
