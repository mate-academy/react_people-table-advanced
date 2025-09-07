import React from 'react';

export default function PeopleTable({ people, searchParams, setSearchParams }) {
  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

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

    if (sortField !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (sortOrder !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th onClick={() => toggleSort('name')}>Name</th>
          <th onClick={() => toggleSort('sex')}>Sex</th>
          <th onClick={() => toggleSort('born')}>Born</th>
          <th onClick={() => toggleSort('died')}>Died</th>
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
