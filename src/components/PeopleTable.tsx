import { useSearchParams } from 'react-router-dom';
import peopleData from '../public/api/people.json';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

const sortIcons = {
  none: '/sort_both.png',
  asc: '/sort_asc.png',
  desc: '/sort_desc.png',
};

const getSortedPeople = (people: Person[], sort: string | null, order: string | null) => {
  if (!sort) return people;
  const sorted = [...people].sort((a, b) => {
    const fieldA = a[sort as keyof Person];
    const fieldB = b[sort as keyof Person];

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return fieldA - fieldB;
    }
    return String(fieldA).localeCompare(String(fieldB));
  });
  if (order === 'desc') return sorted.reverse();
  return sorted;
};

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  let filtered = peopleData.filter((p) => {
    const matchSex = sex ? p.sex === sex : true;
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.motherName && p.motherName.toLowerCase().includes(query)) ||
      (p.fatherName && p.fatherName.toLowerCase().includes(query));
    const century = Math.floor(p.born / 100) + 1;
    const matchCentury = centuries.length ? centuries.includes(century.toString()) : true;
    return matchSex && matchQuery && matchCentury;
  });

  filtered = getSortedPeople(filtered, sortField, sortOrder);

  const getNextSort = (field: string) => {
    if (sortField !== field) return { sort: field, order: null };
    if (!sortOrder) return { sort: field, order: 'asc' };
    if (sortOrder === 'asc') return { sort: field, order: 'desc' };
    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return sortIcons.none;
    if (!sortOrder) return sortIcons.asc;
    if (sortOrder === 'asc') return sortIcons.desc;
    return sortIcons.none;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map((field) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getNextSort(field)}>
                  <img
                    src={getSortIcon(field)}
                    alt="sort icon"
                    style={{ marginLeft: 4 }}
                  />
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((p) => (
          <tr key={p.slug} data-cy="person">
            <td>
              <SearchLink params={{}} to={`/people/${p.slug}`}>
                {p.name}
              </SearchLink>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.motherName ? (
                <SearchLink params={{}} to={`/people/${p.mother?.slug || '#'}`}>
                  {p.motherName}
                </SearchLink>
              ) : (
                '-'
              )}
            </td>
            <td>
              {p.fatherName ? (
                <SearchLink params={{}} to={`/people/${p.father?.slug || '#'}`}>
                  {p.fatherName}
                </SearchLink>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
