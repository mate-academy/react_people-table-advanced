import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage = () => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      setError('');

      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    let result = [...people];

    const sexFilter = searchParams.get('sex');

    if (sexFilter) {
      result = result.filter(person => person.sex === sexFilter);
    }

    const queryFilter = searchParams.get('query');

    if (queryFilter) {
      const query = queryFilter.toLowerCase();

      result = result.filter(person => {
        return (
          person.name.toLowerCase().includes(query) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query)) ||
          (person.fatherName && person.fatherName.toLowerCase().includes(query))
        );
      });
    }

    const centuriesFilter = searchParams.getAll('centuries');

    if (centuriesFilter.length > 0) {
      result = result.filter(person => {
        const personCentury = (
          Math.floor((person.born - 1) / 100) + 1
        ).toString();

        return centuriesFilter.includes(personCentury);
      });
    }

    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortField) {
      result = result.sort((a, b) => {
        let comparison = 0;

        switch (sortField) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'sex':
            comparison = a.sex.localeCompare(b.sex);
            break;
          case 'born':
            comparison = a.born - b.born;
            break;
          case 'died':
            comparison = a.died - b.died;
            break;
          default:
            comparison = 0;
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 && (
          <div className="columns is-desktop is-fullhd">
            <div className="column">
              <div className="box table-container">
                <PeopleTable
                  people={filteredAndSortedPeople}
                  selectedPersonId={personId}
                />
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-one-third-fullhd">
              <PeopleFilters />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
