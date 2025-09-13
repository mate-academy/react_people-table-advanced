import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import sortAsc from '../../public/images/sort_asc.png';
import sortDesc from '../../public/images/sort_desc.png';
import sortBoth from '../../public/images/sort_both.png';
import PersonLink from './PersonLink';

interface Props {
  people: Person[];
  selectedPerson?: Person | null;
}

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filtered = people.filter(p => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.motherName?.toLowerCase().includes(query) ||
      p.fatherName?.toLowerCase().includes(query);
    const matchesSex = !sex || p.sex === sex;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(Math.floor(p.born / 100 + 1).toString());

    return matchesQuery && matchesSex && matchesCentury;
  });
  const toggleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!currentOrder) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sorted = [...filtered];

  if (sortField) {
    sorted.sort((a, b) => {
      let valA = a[sortField as keyof Person] ?? '';
      let valB = b[sortField as keyof Person] ?? '';

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      }

      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      }

      if (valA < valB) {
        return sortOrder === 'desc' ? 1 : -1;
      }

      if (valA > valB) {
        return sortOrder === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return sortBoth;
    }

    if (!sortOrder) {
      return sortAsc;
    }

    return sortOrder === 'desc' ? sortDesc : sortAsc;
  };

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          <th onClick={() => toggleSort('name')}>
            Name <img src={getSortIcon('name')} alt="" />
          </th>
          <th onClick={() => toggleSort('sex')}>
            Sex <img src={getSortIcon('sex')} alt="" />
          </th>
          <th onClick={() => toggleSort('born')}>
            Born <img src={getSortIcon('born')} alt="" />
          </th>
          <th onClick={() => toggleSort('died')}>
            Died <img src={getSortIcon('died')} alt="" />
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(p => {
          const mother =
            people.find(person => person.name === p.motherName) || null;
          const father =
            people.find(person => person.name === p.fatherName) || null;

          return (
            <tr
              key={p.slug}
              className={p.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={p} />
              </td>
              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : p.motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : p.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
