import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  people: Person[];
};

const filterPeople = (
  people: Person[],
  {
    sex,
    query,
    centuries,
    sort,
    order,
  }: {
    sex: string | null;
    query: string | null;
    centuries: string[] | null;
    sort: string | null;
    order: string | null;
  },
): Person[] => {
  let newPeople = [...people];

  switch (sex) {
    case 'f':
      newPeople = newPeople.filter(p => p.sex === 'f');
      break;
    case 'm':
      newPeople = newPeople.filter(p => p.sex === 'm');
      break;
    default:
      break;
  }

  if (query) {
    const name = query.trim().toLowerCase();

    newPeople = newPeople.filter(
      p =>
        p.name.toLowerCase().includes(name) ||
        (p.motherName || '').toLowerCase().includes(name) ||
        (p.fatherName || '').toLowerCase().includes(name),
    );
  }

  if (centuries && centuries.length) {
    newPeople = newPeople.filter(p =>
      centuries.includes((p.born + 100).toString().slice(0, 2)),
    );
  }

  switch (sort) {
    case 'sex':
      newPeople = newPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'query':
      newPeople = newPeople.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'born':
    case 'died':
      newPeople = newPeople.sort((a, b) => a[sort] - b[sort]);
      break;
  }

  if (order === 'desc') {
    newPeople = newPeople.reverse();
  }

  return newPeople;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findInList = (name: string) => {
    return people.find(per => per.name === name);
  };

  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = filterPeople(people, {
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
    centuries: searchParams.getAll('centuries'),
    sort: sortField,
    order: sortOrder,
  });

  const cycleSort = (field: string) => {
    if (sortField !== field) {
      return getSearchWith(searchParams, { sort: field });
    }

    if (sortOrder !== 'desc') {
      return getSearchWith(searchParams, { order: 'desc' });
    } else {
      return getSearchWith(searchParams, { sort: null, order: null });
    }
  };

  const cycleIcon = (field: string) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    return sortOrder !== 'desc' ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink
                  params={{ search: cycleSort(column.toLowerCase()) }}
                >
                  <span className="icon">
                    {cycleIcon(column.toLowerCase())}
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
        {filteredPeople.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            findInList={findInList}
          />
        ))}
      </tbody>
    </table>
  );
};
