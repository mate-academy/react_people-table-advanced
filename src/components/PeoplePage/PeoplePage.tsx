import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from '../../api/getPeople';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedId, setSelectedId] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate({ search: searchParams.toString() });
    }, 500),
    [],
  );

  // #region visiblePeople
  let visiblePeople = people;

  if (appliedQuery) {
    const lowerQuery = appliedQuery.toLowerCase();

    visiblePeople = visiblePeople.filter(person => (
      person.name.toLowerCase().includes(lowerQuery))
        || person.motherName?.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery));
  }
  // #endregion

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSortChange = (event: { target: { id: string; }; }) => {
    const value = event.target.id;

    setSelectedId(value);

    if (value) {
      searchParams.set('sortBy', value);
    } else {
      searchParams.delete('sortBy');
    }

    if (!sortOrder) {
      searchParams.set('sortOrder', 'asc');
    } else if (sortOrder && sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    navigate({ search: searchParams.toString() });
  };

  if (sortBy) {
    visiblePeople.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'sex':
          return sortOrder === 'asc'
            ? a.sex.localeCompare(b.sex)
            : b.sex.localeCompare(a.sex);
        case 'born':
          return sortOrder === 'asc'
            ? a.born - b.born
            : b.born - a.born;
        case 'died':
          return sortOrder === 'asc'
            ? a.died - b.died
            : b.died - a.died;
        default:
          return 0;
      }
    });
  }

  useEffect(() => {
    const fetchedPeople = async () => {
      const result = await getPeople();

      setPeople(result);
    };

    fetchedPeople();
  }, []);

  return (
    <div className="container">
      <h2>People Page</h2>
      <input
        value={query}
        className="input"
        type="text"
        placeholder="Type text"
        onChange={handleQueryChange}
      />
      <PeopleTable
        people={visiblePeople}
        onChange={handleSortChange}
        selectedId={selectedId}
        sortOrder={sortOrder}
      />
    </div>
  );
};
