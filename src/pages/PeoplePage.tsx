/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { NameFilter } from '../components/NameFilter/NameFilter';
import { CenturyFilter } from '../components/CenturyFilter/CenturyFilter';
import { SexFilter } from '../components/SexFilter/SexFilter';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SexValue = 'm' | 'f' | null;

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') as SexValue;

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSexChange = (value: SexValue) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleCenturyToggle = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const selectedCenturies = params.getAll('centuries');

    params.delete('centuries');

    const updatedCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(item => item !== century)
      : [...selectedCenturies, century];

    updatedCenturies.forEach(item => {
      params.append('centuries', item);
    });

    setSearchParams(params);
  };

  const handleResetCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  const handleResetAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('sex');
    params.delete('centuries');

    setSearchParams(params);
  };

  const filteredPeople = people.filter(person => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchesQuery =
      !normalizedQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesSex = !sex || person.sex === sex;

    const century = String(Math.ceil(person.born / 100));

    const matchesCentury =
      centuries.length === 0 || centuries.includes(century);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((person1, person2) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = person1.name.localeCompare(person2.name);
          break;

        case 'sex':
          result = person1.sex.localeCompare(person2.sex);
          break;

        case 'born':
          result = person1.born - person2.born;
          break;

        case 'died':
          result = person1.died - person2.died;
          break;

        default:
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <div className="panel">
                <p className="panel-heading">Filters</p>

                <SexFilter value={sex} onChange={handleSexChange} />

                <div className="panel-block">
                  <NameFilter value={query} onChange={handleQueryChange} />
                </div>

                <div className="panel-block">
                  <CenturyFilter
                    selectedCenturies={centuries}
                    onToggle={handleCenturyToggle}
                    onReset={handleResetCenturies}
                  />
                </div>

                <div className="panel-block">
                  <button
                    type="button"
                    className="button is-link is-outlined is-fullwidth"
                    onClick={handleResetAll}
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                sortedPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading && !error && sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedPersonSlug={slug}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
