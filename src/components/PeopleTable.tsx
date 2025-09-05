import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const selectedCenturies = searchParams
    .getAll('centuries')
    .map(Number)
    .filter(n => !isNaN(n));

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const personText = [
      person.name,
      person.motherName || '',
      person.fatherName || '',
    ]
      .join(' ')
      .toLowerCase();

    if (query && !personText.includes(query)) {
      return false;
    }

    if (selectedCenturies.length > 0) {
      const bornCentury = Math.floor(person.born / 100) + 1;

      if (!selectedCenturies.includes(bornCentury)) {
        return false;
      }
    }

    return true;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    let aValue: string | number = '';
    let bValue: string | number = '';

    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'sex':
        aValue = a.sex;
        bValue = b.sex;
        break;
      case 'born':
        aValue = a.born;
        bValue = b.born;
        break;
      case 'died':
        aValue = a.died;
        bValue = b.died;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortOrder === 'desc' ? 1 : -1;
    }

    if (aValue > bValue) {
      return sortOrder === 'desc' ? -1 : 1;
    }

    return 0;
  });

  if (loading) {
    return <p>Loading people...</p>;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (people.length === 0) {
    {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (filteredPeople.length === 0) {
      {
        return <p>There are no people matching the current search criteria</p>;
      }

      const getNextSortParams = (
        field: string,
      ): Record<string, string | string[] | null> => {
        if (sortField !== field) {
          return { sort: field, order: null };
        }

        if (!sortOrder) {
          return { sort: field, order: 'desc' };
        }

        return { sort: null, order: null };
      };

      const renderSortLink = (field: string) => (
        <SearchLink params={getNextSortParams(field)}>
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </SearchLink>
      );

      return (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name {renderSortLink('name')}
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex {renderSortLink('sex')}
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born {renderSortLink('born')}
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died {renderSortLink('died')}
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => (
              <tr key={person.slug} data-cy="person">
                <td>
                  <SearchLink params={{}}>{person.name}</SearchLink>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{person.motherName || '-'}</td>
                <td>{person.fatherName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
};
