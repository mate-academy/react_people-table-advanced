import React, { useEffect } from 'react';

const ALLOWED_SORT_FIELDS = ['name', 'sex', 'born', 'died'];

export default function PeopleTable({ people, searchParams, setSearchParams }) {
  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const sortFieldRaw = searchParams.get('sort');
  const sortOrderRaw = searchParams.get('order');

  useEffect(() => {
    if (sortFieldRaw && !ALLOWED_SORT_FIELDS.includes(sortFieldRaw)) {
      const params = new URLSearchParams(searchParams);

      params.delete('sort');
      params.delete('order');
      setSearchParams(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFieldRaw]);

  const sortField = ALLOWED_SORT_FIELDS.includes(sortFieldRaw)
    ? sortFieldRaw
    : null;
  const sortOrder = sortOrderRaw === 'desc' ? 'desc' : 'asc'; // default to 'asc' when sorting

  let filtered = people.filter(p => {
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.motherName?.toLowerCase().includes(query) ||
      p.fatherName?.toLowerCase().includes(query);

    const matchesSex = sex ? p.sex === sex : true;

    const birthCentury = Math.ceil(p.born / 100);
    const matchesCentury =
      centuries.length > 0 ? centuries.includes(String(birthCentury)) : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  if (sortField) {
    filtered = [...filtered].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      }

      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      }

      if (valA < valB) {
        return -1;
      }

      if (valA > valB) {
        return 1;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      filtered.reverse();
    }
  }

  const toggleSort = field => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (currentOrder !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const headerCell = (label, field) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order') || 'asc';
    const isActive = currentSort === field;
    const indicator = isActive ? (currentOrder === 'desc' ? '▼' : '▲') : '↕';

    return (
      <th
        onClick={() => toggleSort(field)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        className={isActive ? 'has-text-weight-bold' : ''}
        role="button"
        aria-pressed={isActive}
        title={`Sort by ${label}`}
      >
        <span>{label}</span> <span style={{ marginLeft: 6 }}>{indicator}</span>
      </th>
    );
  };

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          {headerCell('Name', 'name')}
          {headerCell('Sex', 'sex')}
          {headerCell('Born', 'born')}
          {headerCell('Died', 'died')}
        </tr>
      </thead>
      <tbody>
        {filtered.map(person => (
          <tr key={person.slug}>
            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
