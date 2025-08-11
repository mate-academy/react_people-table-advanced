import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

interface PeoplePageProps {
  people: Person[];
}

export const PeoplePage: React.FC<PeoplePageProps> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('century');

  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  // -----------------------------
  // FILTERING
  // -----------------------------

  const filteredPeople = useMemo(() => {
    let filtered = people;

    if (query) {
      const lowerQuery = query.toLowerCase();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(lowerQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(lowerQuery)),
      );
    }

    if (sex === 'm') {
      filtered = filtered.filter(person => person.sex === 'm');
    } else if (sex === 'f') {
      filtered = filtered.filter(person => person.sex === 'f');
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const bornYear = parseInt(person.born as unknown as string, 10);

        if (isNaN(bornYear)) {
          return false;
        }

        const century = Math.ceil(bornYear / 100);

        return centuries.includes(String(century));
      });
    }

    return filtered;
  }, [people, query, sex, centuries]);

  // -----------------------------
  // SORTING
  // -----------------------------

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      let aValue = a[sortField as keyof Person];
      let bValue = b[sortField as keyof Person];

      if (sortField === 'born' || sortField === 'died') {
        aValue = parseInt(aValue as string, 10);
        bValue = parseInt(bValue as string, 10);
      }

      if (aValue < bValue) {
        return -1;
      }

      if (aValue > bValue) {
        return 1;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sortField, sortOrder]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleSexChange = (newSex: 'm' | 'f' | 'all') => {
    const newParams = new URLSearchParams(searchParams);

    if (newSex === 'all') {
      newParams.delete('sex');
    } else {
      newParams.set('sex', newSex);
    }

    setSearchParams(newParams);
  };

  const centuriesOptions = useMemo(() => {
    const setOfCenturies = new Set<number>();

    people.forEach(person => {
      const bornYear = parseInt(person.born as unknown as string, 10);

      if (!isNaN(bornYear)) {
        setOfCenturies.add(Math.ceil(bornYear / 100));
      }
    });

    return Array.from(setOfCenturies).sort((a, b) => a - b);
  }, [people]);

  const handleCenturyClick = (century: number) => {
    const newParams = new URLSearchParams(searchParams);
    const currentCenturies = newParams.getAll('century');
    const centuryStr = String(century);

    if (currentCenturies.includes(centuryStr)) {
      const filtered = currentCenturies.filter(c => c !== centuryStr);

      newParams.delete('century');
      filtered.forEach(c => newParams.append('century', c));
    } else {
      newParams.append('century', centuryStr);
    }

    setSearchParams(newParams);
  };

  const handleCenturyAll = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('century');
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    const newParams = new URLSearchParams();

    setSearchParams(newParams);
  };

  // --------------------------------
  // SORT HANDLER
  // -----------------------------

  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentSort = newParams.get('sort');
    const currentOrder = newParams.get('order');

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else {
      if (!currentOrder) {
        newParams.set('order', 'desc');
      } else {
        newParams.delete('sort');
        newParams.delete('order');
      }
    }

    setSearchParams(newParams);
  };

  // -----------------------------
  // RENDER
  // ------------------------------

  return (
    <div data-cy="peoplePage">
      <h1 className="title" data-cy="pageTitle">
        People Page
      </h1>
      <div className="columns">
        <div className="column">
          <PeopleTable
            people={sortedPeople}
            onSelect={() => {}}
            onSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>

        <div className="column is-one-quarter">
          <aside className="box" style={{ position: 'sticky', top: '1rem' }}>
            <p className="menu-label">Filters</p>
            <div className="field">
              <label className="label" htmlFor="nameFilter">
                Name
              </label>
              <div className="control">
                <input
                  id="nameFilter"
                  type="text"
                  className="input"
                  placeholder="Search by name"
                  value={query}
                  onChange={handleQueryChange}
                  data-cy="nameFilter"
                />
              </div>
            </div>
            <fieldset className="field">
              <legend className="label">Sex</legend>
              <div className="buttons">
                <button
                  className={`button is-small ${!sex ? 'is-info' : ''}`}
                  onClick={() => handleSexChange('all')}
                >
                  All
                </button>
                <button
                  className={`button is-small ${sex === 'm' ? 'is-info' : ''}`}
                  onClick={() => handleSexChange('m')}
                >
                  Male
                </button>
                <button
                  className={`button is-small ${sex === 'f' ? 'is-info' : ''}`}
                  onClick={() => handleSexChange('f')}
                >
                  Female
                </button>
              </div>
            </fieldset>
            <fieldset className="field">
              <legend className="label">Century</legend>
              <div className="buttons">
                {centuriesOptions.map(century => (
                  <button
                    key={century}
                    className={`button is-small ${
                      centuries.includes(String(century)) ? 'is-info' : ''
                    }`}
                    onClick={() => handleCenturyClick(century)}
                  >
                    {century}
                  </button>
                ))}
                <button className="button is-small" onClick={handleCenturyAll}>
                  All
                </button>
              </div>
            </fieldset>
            <div className="field">
              <button className="button is-light" onClick={handleResetFilters}>
                Reset all filters
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
