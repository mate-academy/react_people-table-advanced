import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [fullData, setFullData] = useState<Person[] | null>(null);
  const [data, setData] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFullData(null);
      setData(null);
      setError(null);

      try {
        const response = await getPeople();

        if (response?.length === 0) {
          setError('There are no people on the server');
        } else {
          const dataWithParents = response.map(person => {
            return {
              ...person,
              father: response.find(p => p.name === person.fatherName),
              mother: response.find(p => p.name === person.motherName),
            };
          });

          setFullData(dataWithParents);
          setData(dataWithParents);
        }
      } catch (_) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!fullData) {
      return;
    }

    if (!sex && !query.trim() && centuries.length === 0) {
      setData(fullData);

      return;
    }

    const renderData = fullData.filter(person => {
      let isMatch = true;

      if (sex && person.sex !== sex) {
        isMatch = false;
      }

      if (query.trim() !== '') {
        const queryLower = query.trim().toLowerCase();

        const matchsQuery =
          person.name.toLowerCase().includes(queryLower) ||
          person.fatherName?.toLowerCase().includes(queryLower) ||
          person.motherName?.toLowerCase().includes(queryLower);

        if (!matchsQuery) {
          isMatch = false;
        }
      }

      if (centuries.length > 0) {
        const century = Math.floor(render.born / 100) + 1;

        if (!centuries.includes(String(century))) {
          isMatch = false;
        }
      }

      return isMatch;
    });

    if (
      renderData.length !== (data || []).length ||
      !renderData.every(
        (item, index) => item.name === (data || [])[index]?.name,
      )
    ) {
      setData(renderData);
    }
  }, [fullData, data, sex, query, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && !data?.length && (
                <p data-cy="noPeopleMessage">{error}</p>
              )}

              {!loading && error && <p data-cy="peopleLoadingError">{error}</p>}

              {!loading && data?.length > 0 && <PeopleTable people={data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
