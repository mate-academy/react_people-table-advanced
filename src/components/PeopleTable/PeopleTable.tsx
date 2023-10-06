import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface PeopleTableProps {
  people: Person[];
}

function PeopleTable({ people }: PeopleTableProps) {
  const { slug: currentSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  type SortableFields = 'name' | 'sex' | 'born' | 'died';
  const [sortField, setSortField] = useState<SortableFields | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sexFilter = searchParams.get('sex');
  const centuryFilter = searchParams.getAll('centuries');
  const nameFilter = searchParams.get('query');

  const filteredPeople = people.filter((person) => {
    if (sexFilter && person.sex !== sexFilter) {
      return false;
    }

    if (nameFilter
      && !person.name.toLowerCase().includes(nameFilter.toLowerCase())) {
      return false;
    }

    if (centuryFilter.length > 0
      && !centuryFilter.includes(Math.ceil(person.born / 100).toString())) {
      return false;
    }

    return true;
  });

  function getSortIcon(field: string) {
    if (sortField === field) {
      return sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  }

  const sortedPeople = [...filteredPeople];

  if (sortField) {
    sortedPeople.sort((a, b) => {
      if (a[sortField] > b[sortField]) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      if (a[sortField] < b[sortField]) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      return 0;
    });
  }

  function handleSort(field: SortableFields) {
    if (sortField === field) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }

  function formatNameForURL(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  function getBirthYearByName(
    name: string, peopleList: Person[],
  ): number | null {
    const person = peopleList.find(p => p.name === name);

    return person ? person.born : null;
  }

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <span className="icon">
                    <i className={getSortIcon('name')} />
                  </span>
                </span>
              </th>
              <th onClick={() => handleSort('sex')}>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <span className="icon">
                    <i className={getSortIcon('sex')} />
                  </span>
                </span>
              </th>
              <th onClick={() => handleSort('born')}>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <span className="icon">
                    <i className={getSortIcon('born')} />
                  </span>
                </span>
              </th>
              <th onClick={() => handleSort('died')}>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <span className="icon">
                    <i className={getSortIcon('died')} />
                  </span>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople.map(person => {
              const motherBirthYear = person.motherName
                ? getBirthYearByName(person.motherName, people) : null;
              const fatherBirthYear = person.fatherName
                ? getBirthYearByName(person.fatherName, people) : null;
              const isCurrentPerson = `${formatNameForURL(person.name)}-${person.born}` === currentSlug;

              return (
                <tr
                  key={person.name}
                  data-cy="person"
                  className={isCurrentPerson ? 'has-background-warning' : ''}
                >
                  <td>
                    <Link
                      to={`/people/${formatNameForURL(person.name)}-${person.born}`}
                      className={person.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName && motherBirthYear
                      ? (
                        <Link
                          to={`/people/${formatNameForURL(person.motherName)}-${motherBirthYear}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      )
                      : person.motherName || '-'}
                  </td>
                  <td>
                    {person.fatherName && fatherBirthYear
                      ? (
                        <Link
                          to={`/people/${formatNameForURL(person.fatherName)}-${fatherBirthYear}`}
                        >
                          {person.fatherName}
                        </Link>
                      )
                      : person.fatherName || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PeopleTable;
