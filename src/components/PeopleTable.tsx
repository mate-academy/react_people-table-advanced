import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { TableHeadFieldLink } from './TableHeadFieldLink';
import { filterData } from '../utils/filterData';
import { sortTable } from '../utils/sortTable';

type Props = {
  peopleData: Person[],
  selectedPerson: string,
  searchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({
  peopleData,
  selectedPerson,
  searchParams,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const linkAddress = (
    sortFieldName: string,
    sortBy: string,
    orderBy: string,
  ) => {
    const isOrdered = sortFieldName === sortBy;

    if (isOrdered && orderBy === 'desc') {
      return getSearchWith(searchParams, { order: null, sort: null });
    }

    if (isOrdered && !orderBy.length) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    if (!isOrdered) {
      return getSearchWith(searchParams, { sort: sortFieldName });
    }

    return '';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <TableHeadFieldLink
              linkAddress={linkAddress}
              fieldName="name"
              order={order}
              sort={sort}
            />
          </th>

          <th>
            <TableHeadFieldLink
              linkAddress={linkAddress}
              fieldName="sex"
              order={order}
              sort={sort}
            />
          </th>

          <th>
            <TableHeadFieldLink
              linkAddress={linkAddress}
              fieldName="born"
              order={order}
              sort={sort}
            />
          </th>

          <th>
            <TableHeadFieldLink
              linkAddress={linkAddress}
              fieldName="died"
              order={order}
              sort={sort}
            />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          sortTable(peopleData, sort, order)
            .filter(p => filterData(peopleData, searchParams).includes(p))
            .map((person) => (
              <PersonLink
                key={person.slug}
                person={person}
                isSelected={isSelected(person)}
              />
            ))
        }
      </tbody>
    </table>
  );
};
