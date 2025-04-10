import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { getSortedPeople } from '../utils/getSortedPeople';
import { SortOptions, SortOrder } from '../types/SortOptions';
import { parseEnumValue } from '../utils/parseEnumValue';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const rawSort = searchParams.get('sort');
  const rawOrder = searchParams.get('order');

  const sort = parseEnumValue(rawSort, SortOptions);
  const order = parseEnumValue(rawOrder, SortOrder);

  const sortedPeople = getSortedPeople(people, sort, order);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOptions).map(header => {
            const capitalized = header[0].toUpperCase() + header.slice(1);
            const isActive = sort === header;
            const isDesc = isActive && order === SortOrder.DESC;

            const sortParams = {
              sort: isDesc ? null : header,
              order: !isActive ? null : isDesc ? null : SortOrder.DESC,
            };

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalized}
                  <SearchLink params={sortParams}>
                    <span className="icon">
                      <i
                        className={`fas ${
                          !isActive
                            ? 'fa-sort'
                            : isDesc
                              ? 'fa-sort-down'
                              : 'fa-sort-up'
                        }`}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
